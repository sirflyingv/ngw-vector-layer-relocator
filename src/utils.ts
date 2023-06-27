import NgwConnector from '@nextgis/ngw-connector';
import NgwUploader from '@nextgis/ngw-uploader';
import { NextFunction, Request, Response } from 'express';

const getVectorLayerData = async (ngwConnector: NgwConnector, layerId: number) => {
  const { resource }: any = await ngwConnector.getResource(layerId);
  const vectorLayerGeoJSON: any = await ngwConnector.get('feature_layer.geojson', null, {
    id: layerId
  });
  return {
    ngwResourceData: resource,
    vectorLayerGeoJSON
  };
};

// const uploadVectorLayer = async (
//   ngwUploader: NgwUploader,
//   file: Buffer,
//   name: string,
//   parentId: number,
//   paint: any | null = null // documentation on "paint" is not very clear for me but it still works with null
// ) => {
//   const res = await ngwUploader.uploadVector({ file, name }, { parentId, paint });
//   return res;
// };

const getResourceCLS = async (ngwConnector: NgwConnector | NgwUploader, resourceId: number) => {
  const { resource }: any = await ngwConnector.getResource(resourceId);
  return resource.cls;
};

const catchAsync = function (fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

const wrapRoute = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // run controllers logic
    await fn(req, res, next);
  } catch (e) {
    console.log('in wrap >>>', e);
    // if an exception is raised, do not send any response
    // just continue performing the middleware chain
    next(e);
  }
};

// from nglink
const handleError = (res: Response, er: unknown) => {
  console.error(er);
  return res.status(404).send({
    error: er
  });
};

export {
  getVectorLayerData,
  /* uploadVectorLayer,*/ getResourceCLS,
  catchAsync,
  wrapRoute,
  handleError
};
