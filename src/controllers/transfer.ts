// import fs from 'fs';

import NgwConnector from '@nextgis/ngw-connector';
import NgwUploader from '@nextgis/ngw-uploader';

import { getVectorLayerData, catchAsync, getResourceCLS } from '../utils';
import { NextFunction, Request, Response } from 'express';

const transferVectorLayer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {
    sourceNgwURL,
    sourceLayerId,
    targetNGWURL,
    targetGroupId,
    sourceLogin,
    soursePassword,
    targetLogin,
    targetPassword
  } = req.body;

  const sourceNgwConnector = new NgwConnector({
    baseUrl: `https://${sourceNgwURL}`,
    auth: { login: sourceLogin, password: soursePassword }
  });

  const targetNgwUploader = new NgwUploader({
    baseUrl: `https://${targetNGWURL}`,
    auth: { login: targetLogin, password: targetPassword }
  });

  const sourceResourceCLS: string = await getResourceCLS(
    sourceNgwConnector,
    Number(sourceLayerId)
  ).catch((error) => {
    if (typeof error === 'string' && error.includes('was not found')) {
      return res.send({ status: 'failed', error: 'SOURCE_RESOURCE_NOT_FOUND' });
    } else {
      return res.send({ status: 'failed', error });
    }
  });
  if (sourceResourceCLS !== 'vector_layer') {
    return res.send({ status: 'failed', error: 'SOURCE_IS_NOT_VECTOR' });
  }

  const targetResourceCLS: string = await getResourceCLS(
    targetNgwUploader,
    Number(targetGroupId)
  ).catch((error) => {
    if (typeof error === 'string' && error.includes('was not found')) {
      return res.send({ status: 'failed', error: 'TARGET_RESOURCE_NOT_FOUND' });
    } else {
      return res.send({ status: 'failed', error });
    }
  });
  if (targetResourceCLS !== 'resource_group') {
    return res.send({ status: 'failed', error: 'TARGET_IS_NOT_GROUP' });
  }

  const { ngwResourceData, vectorLayerGeoJSON } = await getVectorLayerData(
    sourceNgwConnector,
    Number(sourceLayerId)
  );

  const file = Buffer.from(JSON.stringify(vectorLayerGeoJSON), 'utf-8');
  const name = ngwResourceData.display_name;

  await targetNgwUploader
    .uploadVector({ file, name }, { parentId: Number(targetGroupId), paint: null })
    .then((response) => {
      return res.send({ status: 'success', response });
    })
    .catch((error) => {
      if (error.startsWith('Resource with same display name already exists')) {
        return res.send({ status: 'failed', error: 'ALREADY_EXISTS' });
      }

      return res.status(500).send(error);
    });
});

export default transferVectorLayer;
