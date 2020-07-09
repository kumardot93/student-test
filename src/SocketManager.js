import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './components/Message.js';
import { takepicture } from './index.js';

import store from './redux/Store.js';
import { connect } from 'react-redux';
import {
	setSocket,
	connected,
	disconnected,
	sendingData,
	savedQuestion,
	dataBufferShift,
	socketError,
	addToDataBuffer,
	setSnapsId
} from './redux/actions/SocketState.js';
import { updateTestData, updateTestDataForReconnected, submitted } from './redux/actions/Test.js';

class SocketManager extends Component {
	constructor(props) {
		super(props);
		this.ws = null;
		this.error = 0;
	}

	NewWebSocket = () => {
		let p = window.location.protocol;
		let scheme = 'wss://';
		if (p == 'http:') scheme = 'ws://'; // adjusting for ws and wss
		let key = extractKey();
		this.ws = new WebSocket(scheme + window.hostName + '/ws/material/student-test/' + key + '/');
		//When the socket wil open tis method will will send the socket to redux ScketState and initilize the backend will the test
		this.ws.onopen = () => {
			this.props.setSocket(this.ws);
		};
		this.ws.onmessage = (ev) => {
			this.error = 0;
			let msg = JSON.parse(ev.data);
			switch (msg.type) {
				case 'connected':
					this.props.updateTestData(msg.TestData);
					this.props.socketConnected();
					break;
				case 'reconnected':
					this.props.updateTestDataForReconnected(msg.TestData);
					this.props.socketConnected();
					break;
				case 'data_received':
					this.props.dataBufferShift();
					break;
				case 'question_received':
					this.props.savedQuestion();
					break;
				case 'submitted':
					this.props.submitted(JSON.parse(this.props.dataBuffer[0]).marks);
					this.props.screen(2);
					this.props.dataBufferShift();
					break;
				case 'fer_ready':
					this.props.dataBufferShift();
					let snaps = setInterval(this.snap, 3000);
					this.props.setSnapsId(snaps);
					break;
				default:
					break;
			}
		};
		// 		// if the socket closes thisfunction will to try to reconnect after 5 seconds
		this.ws.onclose = (ev) => {
			if (this.error === 0) {
				this.props.disconnected();
				setTimeout(this.NewWebSocket, 5000);
			}
		};
		//if there is any error in connection this function will try to reconnect after 15 seconds
		this.ws.onerror = (ev) => {
			this.error += 1;
			if (this.error < 5) {
				this.props.disconnected(); //Socket state to reconecting
				setTimeout(this.NewWebSocket, 5000);
			} else {
				this.props.socketError(); //Error msg for scoket state
				this.error = 1; //To try for connection for 4 time also not 0 otherwise onclose will alsotrigerred and infinite loop will be trigered
				if (!navigator.onLine) {
					window.ononline = () => {
						//to connect agan if internet is down and it connects again
						this.props.disconnected();
						this.NewWebSocket();
					};
				}
			}
		};
	};
	componentDidMount = () => {
		this.NewWebSocket();
	};
	BufferManager = () => {
		let questions = store.getState().Test.questions;
		if (this.props.isready === 0) return;
		if (this.props.questionBuffer.length !== 0) {
			let qstn = questions[this.props.questionBuffer[0]];
			let [ answer, state ] = [ qstn.answer, qstn.state ];
			let data = {
				type: 'questionUpdate',
				index: this.props.questionBuffer[0],
				payload: { answer, state }
			};
			data = JSON.stringify(data);
			this.props.sendingData();
			this.ws.send(data);
		} else if (this.props.dataBuffer.length !== 0) {
			let data = this.props.dataBuffer[0];
			this.props.sendingData();
			this.ws.send(data);
		}
	};
	snap = () => {
		let canvas = takepicture();
		let reader = new FileReader();
		reader.onload = (event) => {
			let data = event.target.result;
			let imageByteArray = new Uint8Array(data);
			let imageArrayData = Array.from(imageByteArray);
			let res = {
				type: 'ferimage',
				payload: {
					name: new Date().toLocaleTimeString().replace(/:/g, '-') + '.png',
					image: imageArrayData,
					question_number: this.props.active + 1
				}
			};
			this.props.addToDataBuffer(JSON.stringify(res));
		};
		canvas.toBlob((blob) => {
			reader.readAsArrayBuffer(blob);
		});
	};
	render() {
		this.BufferManager();
		// console.log('socket : ', this.props.socket);
		ReactDOM.unmountComponentAtNode(document.getElementById('message'));
		ReactDOM.render(<Message message={this.props.socket.status} />, document.getElementById('message'));
		return (
			<React.Fragment>
				<button onClick={this.snap}>snap</button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		socket: state.SocketState,
		dataBuffer: state.SocketState.dataBuffer,
		questionBuffer: state.SocketState.questionBuffer,
		isready: state.SocketState.isready,
		screen: state.SocketState.screen
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSocket: (ws) => dispatch(setSocket(ws)),
		socketConnected: () => dispatch(connected()),
		updateTestData: (data) => dispatch(updateTestData(data)),
		disconnected: () => dispatch(disconnected()),
		updateTestDataForReconnected: (data) => dispatch(updateTestDataForReconnected(data)),
		sendingData: () => dispatch(sendingData()),
		savedQuestion: () => dispatch(savedQuestion()),
		dataBufferShift: () => dispatch(dataBufferShift()),
		socketError: () => dispatch(socketError()),
		submitted: (marks) => dispatch(submitted(marks)),
		addToDataBuffer: (data) => dispatch(addToDataBuffer(data)),
		setSnapsId: (id) => dispatch(setSnapsId(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketManager);

var extractKey = () => {
	//extracts the pk form the url
	let url = window.location.href;
	let size = url.length;
	let lastindexofSlash = url.lastIndexOf('/');
	if (lastindexofSlash === size - 1) {
		url = url.slice(0, -1);
		lastindexofSlash = url.lastIndexOf('/');
	}
	return url.substring(lastindexofSlash + 1);
};

export { extractKey };
