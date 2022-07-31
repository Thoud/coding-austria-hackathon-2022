import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/PopupContent.module.css';

export default function PopupContent(props) {
  const {
    gemeindeName,
    aktuellerVerbrauch,
    aktuellerAutarkiegrad,
    zukunftSonne,
    zukunftWind,
    zukunftAutarkiegrad,
    setChangeColor,
  } = props;

  const [potentialView, setPotentialView] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {!potentialView && (
        <div>
          <h3 className={styles.heading}>{gemeindeName}</h3>
          <p className={styles.text}>
            annual consumption: {aktuellerVerbrauch.toLocaleString('de')}
          </p>
          <p className={styles.text}>
            degree of self-sufficiency in %: {aktuellerAutarkiegrad}
          </p>
          <div className={styles.iconBefore}>
            <Image src="/arrow.png" alt="" width={1000} height={1000} />
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => {
                setPotentialView(true);
                setChangeColor(true);
              }}
            >
              Calculate potential
            </button>
          </div>
        </div>
      )}
      {potentialView && (
        <div>
          <h3 className={styles.heading}>Potential</h3>
          <p className={styles.text}>
            Expansion PV: {zukunftSonne.toLocaleString('de')}
          </p>
          <p className={styles.text}>
            Expansion Windpark: {zukunftWind.toLocaleString('de')}
          </p>
          <p className={styles.text}>
            degree of self-sufficiency in %: {zukunftAutarkiegrad}
          </p>
          <div className={styles.icon1After}>
            <Image src="/arrow.png" alt="" width={1000} height={1000} />
          </div>
          <div className={styles.icon2After}>
            <Image src="/arrow.png" alt="" width={1000} height={1000} />
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => {
                setPotentialView(false);
                setChangeColor(false);
              }}
            >
              Request advice now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
