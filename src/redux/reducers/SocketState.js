// const SocketState = (
// 	state = { socket: null, status: 'connecting', buffer: [], dataBuffer: [], isready: 0 },
// 	action
// ) => {
// 	state = { ...state };
// 	switch (action.type) {
// 		case 'setSocket':
// 			state.socket = action.payload;
// 			break;
// 		case 'connected':
// 			state.status = 'connected';
// 			state.isready = 1;
// 			break;
// 		case 'disconnected':
// 			state.status = 'reconnecting';
// 			state.isready = 0;
// 			break;
// 		case 'addToBuffer':
// 			state.buffer = [ ...state.buffer, action.payload ];
// 			break;
// 		case 'sendingData':
// 			state.isready = 0;
// 			state.status = 'saving';
// 			break;
// 		case 'savedData':
// 			state.buffer.shift();
// 			state.buffer = [ ...state.buffer ];
// 			if (state.buffer.length === 0 && state.dataBuffer.length === 0) state.status = 'saved';
// 			state.isready = 1;
// 			break;
// 		case 'dataBufferShift':
// 			state.dataBuffer.shift();
// 			state.dataBuffer = [ ...state.dataBuffer ];
// 			state.isready = 1;
// 			if (state.buffer.length === 0 && state.dataBuffer.length === 0) state.status = 'saved';
// 			break;
// 		case 'addToDataBuffer':
// 			state.dataBuffer = [ ...state.dataBuffer, action.payload ];
// 			break;
// 		default:
// 			break;
// 	}
// 	return state;
// };

// export default SocketState;
