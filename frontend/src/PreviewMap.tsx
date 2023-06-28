import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import NgwMap from '@nextgis/ngw-leaflet';
// import { GeoJsonObject } from 'geojson';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewMap = (vectorLayer: any) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<NgwMap | null | any>(null);

  console.log(vectorLayer.vectorLayer.layer);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (mapContainer && !mapInstanceRef.current) {
      mapInstanceRef.current = NgwMap.create({
        target: mapContainer,
        qmsId: 448
      }).then((NgwMap) => {
        NgwMap.addGeoJsonLayer({
          data: vectorLayer.vectorLayer.layer,
          paint: { color: 'green', radius: 6 }
        });
      });
    }
  }, []);

  return (
    <Card className="mx-3 mb-4 map-container">
      <div ref={mapContainerRef} className="map-container"></div>
    </Card>
  );
};

export default PreviewMap;
