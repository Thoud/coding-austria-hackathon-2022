import Head from 'next/head';
import { useState } from 'react';
import Map from '../components/Map';
import PopupContent from '../components/PopupContent';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const { center, location, zoom, polygons } = props;
  const [changeColor, setChangeColor] = useState(false);

  return (
    <>
      <Head>
        <title>MuniciPAL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Map
          className={styles.map}
          center={center}
          zoom={zoom}
          location={location}
        >
          {({ TileLayer, Popup, Polygon }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {polygons.map((polygon) => (
                <Polygon
                  key={`polygon ${polygon.id}`}
                  positions={polygon.path}
                  pathOptions={{
                    color: !changeColor
                      ? polygon.colorBefore
                      : polygon.colorAfter,
                    weight: 1,
                    fillOpacity: 0.5,
                  }}
                >
                  <Popup>
                    <PopupContent setChangeColor={setChangeColor} {...props} />
                  </Popup>
                </Polygon>
              ))}
            </>
          )}
        </Map>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { getGemeinde, getCapacity } = await import('../utils/database');

  const { ev_insgesamt, gemeindename } = await getGemeinde();
  const { pv, wind } = await getCapacity();

  const aktuellerVerbrauch = ev_insgesamt * 0.3 * 1000;
  const aktuellerAutarkiegrad =
    Math.round(((pv + wind) * 10000) / aktuellerVerbrauch, 2) / 100;
  const zukunftVerbrauch = aktuellerVerbrauch * 1.1224;
  const zukunftSonne = pv * 10;
  const zukunftWind = wind * 2;
  const zukunftAutarkiegrad =
    Math.round(((zukunftWind + zukunftSonne) * 10000) / zukunftVerbrauch) / 100;

  return {
    props: {
      center: [48.207917, 16.371754],
      location: [48.804186, 15.489089],
      zoom: 12,
      gemeindeName: gemeindename,
      aktuellerVerbrauch,
      aktuellerAutarkiegrad,
      zukunftSonne,
      zukunftWind,
      zukunftAutarkiegrad,
      polygons: [
        {
          id: 1,
          colorBefore: '#7f1d1d',
          colorAfter: '#3f6212',
          path: [
            [48.787114, 15.463584],
            [48.787114, 15.51396],
            [48.805036, 15.536153],
            [48.822958, 15.51396],
            [48.822958, 15.463584],
            [48.805036, 15.441391],
          ],
        },
        {
          id: 2,
          colorBefore: '#b91c1c',
          colorAfter: '#b91c1c',
          path: [
            [48.822958, 15.463584],
            [48.822958, 15.51396],
            [48.84088, 15.536153],
            [48.858802, 15.51396],
            [48.858802, 15.463584],
            [48.84088, 15.441391],
          ],
        },
        {
          id: 3,
          colorBefore: '#f87171',
          colorAfter: '#f87171',
          path: [
            [48.787114, 15.51396],
            [48.787114, 15.463584],
            [48.769192, 15.441391],
            [48.75127, 15.463584],
            [48.75127, 15.51396],
            [48.769192, 15.536153],
          ],
        },
        {
          id: 4,
          colorBefore: '#3f6212',
          colorAfter: '#3f6212',
          path: [
            [48.805036, 15.441391],
            [48.805036, 15.391015],
            [48.787114, 15.368822],
            [48.769192, 15.391015],
            [48.769192, 15.441391],
            [48.787114, 15.463584],
          ],
        },
        {
          id: 5,
          colorBefore: '#f87171',
          colorAfter: '#f87171',
          path: [
            [48.84088, 15.441391],
            [48.84088, 15.391015],
            [48.822958, 15.368822],
            [48.805036, 15.391015],
            [48.805036, 15.441391],
            [48.822958, 15.463584],
          ],
        },
        {
          id: 6,
          colorBefore: '#ef4444',
          colorAfter: '#ef4444',
          path: [
            [48.805036, 15.536153],
            [48.805036, 15.586529],
            [48.787114, 15.608722],
            [48.769192, 15.586529],
            [48.769192, 15.536153],
            [48.787114, 15.51396],
          ],
        },
        {
          id: 7,
          colorBefore: '#f87171',
          colorAfter: '#f87171',
          path: [
            [48.84088, 15.536153],
            [48.84088, 15.586529],
            [48.822958, 15.608722],
            [48.805036, 15.586529],
            [48.805036, 15.536153],
            [48.822958, 15.51396],
          ],
        },
      ],
    },
  };
}
