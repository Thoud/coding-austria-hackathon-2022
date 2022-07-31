import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';

export default function PopupContent(props) {
  const {
    gemeindeName,
    aktuellerVerbrauch,
    aktuellerAutarkiegrad,
    zukunftSonne,
    zukunftWind,
    zukunftAutarkiegrad,
  } = props;

  const [potentialView, setPotentialView] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {!potentialView && (
        <div>
          <h3>{gemeindeName}</h3>
          <p>annual consumption: {aktuellerVerbrauch}</p>
          <p>degree of self-sufficiency in %: {aktuellerAutarkiegrad}</p>
          <button onClick={() => setPotentialView(true)}>
            Calculate potential
          </button>
        </div>
      )}
      {potentialView && (
        <div>
          <h3>Potential</h3>
          <p>Expansion PV: {zukunftSonne}</p>
          <p>Expansion Windpark: {zukunftWind}</p>
          <p>degree of self-sufficiency in %: {zukunftAutarkiegrad}</p>
          <button onClick={() => setPotentialView(false)}>
            Request advice now
          </button>
        </div>
      )}
    </div>
  );
}
