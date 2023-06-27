// import fs from 'fs';

import NgwConnector from '@nextgis/ngw-connector';
import NgwUploader from '@nextgis/ngw-uploader';

// import { getVectorLayerData, catchAsync, getResourceCLS } from '../utils';
import { NextFunction, Request, Response } from 'express';

const transferVectorLayer = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const targetNgwConnector = new NgwConnector({
      baseUrl: `https://${targetNGWURL}`,
      auth: { login: targetLogin, password: targetPassword }
    });

    const targetNgwUploader = new NgwUploader({
      baseUrl: `https://${targetNGWURL}`,
      auth: { login: targetLogin, password: targetPassword }
    });

    try {
      const { resource } = await sourceNgwConnector.get('resource.item', null, {
        id: Number(sourceLayerId)
      });

      if (resource.cls !== 'vector_layer') {
        return res.send({ status: 'failed', error: 'SOURCE_IS_NOT_VECTOR' });
      }
    } catch (error) {
      if (typeof error === 'string' && error.includes('was not found')) {
        return res.send({ status: 'failed', error: 'SOURCE_RESOURCE_NOT_FOUND' });
      } else {
        // throw error;
        return res.send({ status: 'failed', error });
      }
    }

    try {
      const { resource }: any = await targetNgwConnector.get('resource.item', null, {
        id: Number(targetGroupId)
      });

      if (resource.cls !== 'resource_group') {
        return res.send({ status: 'failed', error: 'TARGET_IS_NOT_GROUP' });
      }
    } catch (error) {
      if (typeof error === 'string' && error.includes('was not found')) {
        return res.send({ status: 'failed', error: 'TARGET_RESOURCE_NOT_FOUND' });
      } else {
        // throw error;
        return res.send({ status: 'failed', error });
      }
    }

    const { resource }: any = await sourceNgwConnector.getResource(Number(sourceLayerId));
    const vectorLayerGeoJSON: any = await sourceNgwConnector.get('feature_layer.geojson', null, {
      id: Number(sourceLayerId)
    });

    const file = Buffer.from(JSON.stringify(vectorLayerGeoJSON), 'utf-8');
    const name = resource.display_name;

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
  } catch (error) {
    next(error);
  }
};

export default transferVectorLayer;
