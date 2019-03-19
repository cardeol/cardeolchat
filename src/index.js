import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Utils from './lib/Utils';
import mainReducer from './reducers/main';

// persistence redux <-> localStorage
const persistedState = localStorage.getItem('AppReduxState') ? JSON.parse(localStorage.getItem('AppReduxState')) : {}

const store = createStore(mainReducer, persistedState);

/**
 * @summary Redux to LocalStorage, occurs with a 2 seconds threshold for better eprformance
 */
const debounceSave = Utils.debounce(() => { // debounce saving after 2sec
    localStorage.setItem('AppReduxState', JSON.stringify(store.getState()));
}, 2000);    

store.subscribe(() => {
    debounceSave();
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
