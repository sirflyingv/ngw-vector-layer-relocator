import NgwConnector from '@nextgis/ngw-connector';
import NgwUploader from '@nextgis/ngw-uploader';

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

const uploadVectorLayer = async (
  ngwUploader: NgwUploader,
  file: Buffer,
  name: string,
  parentId: number,
  paint: any | null = null // documentation on "paint" is not very clear for me but it still works with null
) => {
  const res = await ngwUploader.uploadVector({ file, name }, { parentId, paint });
  return res;
};

export { getVectorLayerData, uploadVectorLayer };
