import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGood, selectOk, selectBad } from './reducer';

const App = () => {
  const good = useSelector(selectGood);
  const ok = useSelector(selectOk);
  const bad = useSelector(selectBad);
  const dispatch = useDispatch();

  const handleClick = (type) => {
    dispatch({ type });
  };

  return (
    <div>
      <h1>Unicafe</h1>
      <button onClick={() => handleClick('GOOD')}>Good</button>
      <button onClick={() => handleClick('OK')}>Ok</button>
      <button onClick={() => handleClick('BAD')}>Bad</button>
      <button onClick={() => handleClick('ZERO')}>Reset</button>
      <div>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Ok: {ok}</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  );
};

export default App;
