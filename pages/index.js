import Head from 'next/head';
import Map from '../components/Map';
import PopupContent from '../components/PopupContent';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const { center, location, zoom, polygons } = props;

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
          {({ TileLayer, Marker, Popup, Polygon }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {polygons.map((polygon) => (
                <Polygon
                  key={`polygon ${polygon.id}`}
                  pathOptions={{ color: polygon.color }}
                  positions={polygon.path}
                >
                  <Popup>
                    <PopupContent {...props} />
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
  const capacity = await getCapacity();
  const pv = capacity.pv['kapazität'];
  const wind = capacity.wind['kapazität'];
  const aktuellerVerbrauch = ev_insgesamt * 0.3 * 1000;
  const aktuellerAutarkiegrad = ((pv + wind) * 100) / aktuellerVerbrauch;
  const zukunftVerbrauch = aktuellerVerbrauch * 1.1224;
  const zukunftSonne = pv * 10;
  const zukunftWind = wind * 2;
  const zukunftAutarkiegrad =
    ((zukunftWind + zukunftSonne) * 100) / zukunftVerbrauch;

  return {
    props: {
      center: [48.804186, 15.489089],
      location: [48.804186, 15.489089],
      zoom: 13,
      gemeindeName: gemeindename,
      aktuellerVerbrauch,
      aktuellerAutarkiegrad,
      zukunftSonne,
      zukunftWind,
      zukunftAutarkiegrad,
      polygons: [
        {
          id: 1,
          color: 'red',
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
          color: 'purple',
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
          color: 'purple',
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
          color: 'purple',
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
          color: 'purple',
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
          color: 'purple',
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
          color: 'purple',
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
