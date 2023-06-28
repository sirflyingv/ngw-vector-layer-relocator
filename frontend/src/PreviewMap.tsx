import React /*, { useEffect, useRef } */ from 'react';
import { Card } from 'react-bootstrap';
import NgwMap from '@nextgis/ngw-leaflet';
// import { useTranslation } from 'react-i18next';

const PreviewMap = (props: { name: string; layer: object }) => {
  //   const { t } = useTranslation();
  const { name, layer } = props;
  console.log(layer, name);

  // const map = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (map.current) {
  //     map.current.classList.add('test-height');
  //   }
  // });

  NgwMap.create({
    target: 'map',
    qmsId: 448
  });

  return (
    <Card className="mx-3 mb-4 map-container">
      <div id="map" className="map-container"></div>
    </Card>
  );
};

export default PreviewMap;
