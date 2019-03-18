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

const debounceSave = Utils.debounce(() => { // debounce saving after 2sec
    localStorage.setItem('AppReduxState', JSON.stringify(store.getState()));
}, 2000);    

store.subscribe(() => {
    debounceSave();
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
