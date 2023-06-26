import express, { Express, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import NgwConnector from '@nextgis/ngw-connector';
import NgwUploader from '@nextgis/ngw-uploader';

import { getVectorLayerData, uploadVectorLayer } from './utils';

const app: Express = express();
const port = 3000;

const frontendPath = path.join(__dirname, '../dist/frontend/');
// const tempPath = path.join(__dirname, '../dist/temp/');
// fs.rmSync(tempPath, { recursive: true });
// fs.mkdirSync(tempPath);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  '/',
  express.static(frontendPath, {
    maxAge: 31557600000
  })
);

// app.post('/preview', async (req: Request, res: Response) => {
//   const { sourceNgwURL, sourceLayerId } = req.body;
//   const id: number = Number(sourceLayerId);
//   const ngwConnector = new NgwConnector({
//     baseUrl: `https://${sourceNgwURL}`
//     // auth: {login, password}
//   });
//   const vectorLayer = await getVectorLayer(ngwConnector, id);
//   console.log(vectorLayer);
//   res.send(vectorLayer);
// });

app.post('/transfer', async (req: Request, res: Response) => {
  const { sourceNgwURL, sourceLayerId, targetNGWURL, targetGroupId } = req.body;

  const sourceNgwConnector = new NgwConnector({
    baseUrl: `https://${sourceNgwURL}`
    // auth: {login, password}
  });

  const targetNgwConnector = new NgwUploader({
    baseUrl: `https://${targetNGWURL}`
    // auth: {login, password}
  });

  const sourceResource: any = await sourceNgwConnector.getResource(Number(sourceLayerId));
  const targetResource: any = await targetNgwConnector.getResource(Number(targetGroupId));
  console.log(sourceResource);
  if (sourceResource.resource.cls !== 'vector_layer') {
    res.send({ status: 'SOURCE_IS_NOT_VECTOR' });
  } else if (targetResource.resource.cls !== 'resource_group') {
    res.send({ status: 'TARGET_IS_NOT_GROUP' });
  } else {
    try {
      const { ngwResourceData, vectorLayerGeoJSON } = await getVectorLayerData(
        sourceNgwConnector,
        Number(sourceLayerId)
      );

      const file = Buffer.from(JSON.stringify(vectorLayerGeoJSON), 'utf-8');
      const name = ngwResourceData.display_name;

      const uploadResult = await uploadVectorLayer(targetNgwConnector, file, name, targetGroupId);

      res.send({ status: 'success', uploadResult });
    } catch (error) {
      res.send({ status: 'failed', error });
    }
  }
  // console.log('/transfer 55', vectorLayerData);
  // const tempGeoJSONPath = path.join(tempPath, `${sourceNgwURL}:${id}_${Date.now()}`);
  // fs.writeFileSync(tempGeoJSONPath, JSON.stringify(vectorLayerGeoJSON));
  // const file = fs.readFileSync(tempGeoJSONPath);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
