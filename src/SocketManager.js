// import React, { Component } from 'react';
// // import ReactDOM from 'react-dom';
// // import Message from './components/Message.js';

// import store from './redux/Store.js';
// import { connect } from 'react-redux';
// import { imageUploaded, AddingToBuffer } from './redux/actions/Test.js';
// import { setSocket, connected, sending, saved, disconnected, dataBufferShift } from './redux/actions/SocketState.js';

// class SocketManager extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.ws = null;
// 	}

// 	InitilizeBackend = () => {
// 		let key = extractKey();
// 		key = parseInt(key);
// 		let raw_data = { type: 'initilization', payload: key };
// 		this.ws.send(JSON.stringify(raw_data));
// 	};

// 	NewWebSocket = () => {
// 		this.ws = new WebSocket('ws://' + window.hostName + '/ws/material/testMaker/');

// 		//When the socket wil open tis method will will send the socket to redux ScketState and initilize the backend will the test
// 		this.ws.onopen = () => {
// 			this.props.setSocket(this.ws);
// 			this.InitilizeBackend();
// 		};

// 		this.ws.onmessage = (ev) => {
// 			let msg = JSON.parse(ev.data);
// 			switch (msg.type) {
// 				case 'connected':
// 					this.props.socketConnected();
// 					break;
// 				case 'saved':
// 					this.props.saved();
// 					break;
// 				case 'imageUploaded':
// 					this.props.dataBufferShift();
// 					this.props.imageUploaded(msg.index, msg.image);
// 					break;
// 				case 'dataUploaded':
// 					this.props.dataBufferShift();
// 					break;
// 				case 'error':
// 					switch (msg.code) {
// 						case 'NI':
// 							this.props.disconnected();
// 							this.InitilizeBackend();
// 							break;
// 						default:
// 							this.props.disconnected();
// 							this.ws.close();
// 					}
// 					break;
// 				default:
// 					break;
// 			}
// 		};

// 		// if the socket closes thisfunction will to try to reconnect after 5 seconds
// 		this.ws.onclose = (ev) => {
// 			this.props.disconnected();
// 			setTimeout(this.NewWebSocket, 5000);
// 		};

// 		//if there is any error in connection this function will try to reconnect after 15 seconds
// 		this.ws.onerror = (ev) => {
// 			this.props.disconnected();
// 			setTimeout(this.NewWebSocket, 15000);
// 		};
// 	};

// 	componentDidMount = () => {
// 		this.NewWebSocket();
// 	};

// 	BufferManager = () => {
// 		let questions = store.getState().Test.questions;
// 		if (this.props.isready === 0) return;
// 		if (this.props.buffer.length !== 0) {
// 			let qstn = questions[this.props.buffer[0]];
// 			let data = {
// 				type: 'questionUpdate',
// 				payload: qstn
// 			};
// 			data = JSON.stringify(data);
// 			this.props.sendingData();
// 			this.ws.send(data);
// 			return;
// 		} else if (this.props.dataBuffer.length !== 0) {
// 			let data = this.props.dataBuffer[0];
// 			this.props.sendingData();
// 			this.ws.send(data);
// 		}
// 	};

// 	render() {
// 		this.BufferManager();
// 		return (
// 			<React.Fragment>
// 				<button className="float-right mr-4 mb-4 mt-1 btn btn-success" onClick={AddingToBuffer}>
// 					save
// 				</button>
// 			</React.Fragment>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		dataBuffer: state.SocketState.dataBuffer,
// 		buffer: state.SocketState.buffer,
// 		isready: state.SocketState.isready
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setSocket: (ws) => dispatch(setSocket(ws)),
// 		socketConnected: () => dispatch(connected()),
// 		sendingData: () => dispatch(sending()),
// 		saved: () => dispatch(saved()),
// 		imageUploaded: (index, image) => dispatch(imageUploaded(index, image)),
// 		dataBufferShift: () => dispatch(dataBufferShift()),
// 		disconnected: () => dispatch(disconnected())
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SocketManager);

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
