import express, { Express, Request, Response } from "express";
import path from "path";

import NgwConnector from "@nextgis/ngw-connector";

const app: Express = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  "/",
  express.static(path.join(__dirname, "../dist/frontend/"), {
    maxAge: 31557600000,
  })
);

app.post("/test", (req: Request, res: Response) => {
  const { sourceNgwURL, sourceLayerId } = req.body;

  const ngwConnector = new NgwConnector({
    baseUrl: `https://${sourceNgwURL}`,
    // auth: {login, password}
  });

  ngwConnector
    .get("feature_layer.geojson", null, { id: Number(sourceLayerId) })
    .then((data) => {
      console.log(data);
    });

  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
