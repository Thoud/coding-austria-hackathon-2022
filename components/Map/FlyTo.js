import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function FlyTo({ location }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.flyTo(location, 13, { duration: 6 });
    }, 1000);

    return () => clearTimeout(timer);
  }, [map, location]);

  return null;
}
