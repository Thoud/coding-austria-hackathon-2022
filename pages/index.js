import Head from 'next/head';
import Map from '../components/Map';
import styles from '../styles/Home.module.css';

export default function Home() {
  const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
  ];

  const center = [51.505, -0.09];

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Map className={styles.map} center={center} zoom={12}>
          {({ TileLayer, Marker, Popup, Polygon }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Polygon pathOptions={{ color: 'purple' }} positions={polygon} />
              <Marker position={center}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      </main>
    </>
  );
}
