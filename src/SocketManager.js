import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './components/Message.js';
import Guidelins from './components/Body/Guideline.js';
import { takepicture, stopVideo } from './index.js';
import VideoInput from './VideoSupport.js';

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
	setSnapsId,
	switchFer,
	newMessage
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
		this.ws = new WebSocket(scheme + window.hostName + '/ws/studentTest/student-testSA/' + key + '/');
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
					let overlay = document.getElementById('overlay');
					overlay.style.display = 'block';
					ReactDOM.render(<Guidelins />, overlay);
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
					this.props.switchFER(1);
					let snaps = setInterval(() => {
						VideoInput.takepicture();
						VideoInput.SendSnap();
					}, 3000);
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
				this.props.newMessage({
					code: 'SOCKET_ERROR',
					message: 'Connection Error'
				});
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
		if (this.props.isready === 0) return;
		let questions = store.getState().Test.questions;
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

	render() {
		this.BufferManager();
		// console.log('socket : ', this.props.socket);
		return <React.Fragment />;
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
		setSnapsId: (id) => dispatch(setSnapsId(id)),
		switchFER: (val) => dispatch(switchFer(val)),
		newMessage: (msg) => dispatch(newMessage(msg))
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
