import { NextFunction, Request, Response } from 'express';
import NgwConnector from '@nextgis/ngw-connector';
import { catchAsync } from '../utils';

const previewLayer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { sourceNgwURL, sourceLayerId } = req.body;

  try {
    const sourceNgwConnector = new NgwConnector({
      baseUrl: sourceNgwURL
    });

    try {
      const { resource } = await sourceNgwConnector.get('resource.item', null, {
        id: Number(sourceLayerId)
      });

      if (resource.cls !== 'vector_layer') {
        return res.send({ status: 'failed', message: 'SOURCE_IS_NOT_VECTOR' });
      }
    } catch (error) {
      if (typeof error === 'string' && error.includes('was not found')) {
        return res.send({ status: 'failed', message: 'SOURCE_RESOURCE_NOT_FOUND' });
      } else {
        return res.send({ status: 'failed', error });
      }
    }

    const { resource }: any = await sourceNgwConnector.getResource(Number(sourceLayerId));
    const vectorLayerGeoJSON: any = await sourceNgwConnector.get('feature_layer.geojson', null, {
      id: Number(sourceLayerId)
    });

    const name = resource.display_name;

    res.send({
      status: 'success',
      data: {
        name,
        layer: vectorLayerGeoJSON
      }
    });
  } catch (error) {
    // next(error);
    return res.status(500).send(error);
  }
});

export default previewLayer;
