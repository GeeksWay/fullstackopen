// main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import reducer from './reducer'; // Import the reducer

// Create Redux store with Redux Toolkit's configureStore
const store = configureStore({ reducer });

// Action creators
const incrementGood = () => ({ type: 'GOOD' });
const incrementOk = () => ({ type: 'OK' });
const incrementBad = () => ({ type: 'BAD' });
const reset = () => ({ type: 'ZERO' });

// Main App component
const App = () => {
  const dispatch = useDispatch();

  // Use selectors to get specific pieces of state
  const good = useSelector((state) => state.good);
  const ok = useSelector((state) => state.ok);
  const bad = useSelector((state) => state.bad);

  // Handlers
  const handleGood = () => dispatch(incrementGood());
  const handleOk = () => dispatch(incrementOk());
  const handleBad = () => dispatch(incrementBad());
  const handleReset = () => dispatch(reset());

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Unicafe Feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleOk}>Ok</button>
      <button onClick={handleBad}>Bad</button>
      <button onClick={handleReset}>Reset</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Ok: {ok}</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  );
};

// Create a root and render the App component wrapped with Redux Provider
const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
