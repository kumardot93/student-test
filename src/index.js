import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './redux/Store.js';
import { Provider } from 'react-redux';
import SocketManager from './SocketManager.js';

window.base = 'http://localhost:8000';
window.hostName = 'localhost:8000';
window.media_url = window.base + '/media/';
window.cred = 'include';

ReactDOM.render(
	<Provider store={Store}>
		<App />
		{/* <SocketManager /> */}
	</Provider>,
	document.getElementById('root')
);
// var ws = new WebSocket('ws://' + window.host + '/ws/material/testMaker/');
// export { ws };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
