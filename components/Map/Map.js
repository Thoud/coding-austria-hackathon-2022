import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import * as ReactLeaflet from 'react-leaflet';

export default function Map({ children, location, ...rest }) {
  const { MapContainer, MapConsumer } = ReactLeaflet;

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer {...rest}>
      <MapConsumer>
        {(map) => (
          <>
            {children(ReactLeaflet, map)}
            {/* <FlyTo location={location} /> */}
          </>
        )}
      </MapConsumer>
    </MapContainer>
  );
}
