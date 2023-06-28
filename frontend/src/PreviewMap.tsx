import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import NgwMap from '@nextgis/ngw-leaflet';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewMap = (props: any) => {
  const { vectorLayer } = props;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<NgwMap | any>(null);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (mapContainer && !mapInstanceRef.current) {
      mapInstanceRef.current = NgwMap.create({
        target: mapContainer,
        qmsId: 448
      }).then((NgwMap) => {
        NgwMap.addGeoJsonLayer({
          data: vectorLayer.geojson,
          paint: { color: 'green', radius: 6 }, // hardcode
          fit: true
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
