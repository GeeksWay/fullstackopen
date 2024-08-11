import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterReducer from './reducer';

// Create the Redux store
const store = createStore(counterReducer);

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
