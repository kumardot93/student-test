const SocketState = (
	state = { socket: null, status: 'connecting', questionBuffer: [], dataBuffer: [], isready: 0, screen: null },
	action
) => {
	state = { ...state };
	switch (action.type) {
		case 'setSocket':
			state.socket = action.payload;
			state.status = 'fetching';
			break;
		case 'connected':
			state.status = 'connected';
			state.isready = 1;
			break;
		case 'disconnected':
			state.status = 'disconnected';
			state.isready = 0;
			break;
		case 'addToQuestionBuffer':
			state.questionBuffer = [ ...state.questionBuffer, action.payload ];
			break;
		case 'sendingData':
			state.isready = 0;
			state.status = 'saving';
			break;
		case 'addToDataBuffer':
			state.dataBuffer = [ ...state.dataBuffer, action.payload ];
			break;
		case 'savedQuestion':
			state.questionBuffer = [ ...state.questionBuffer.splice(1) ];
			if (state.questionBuffer.length === 0 && state.dataBuffer.length === 0) state.status = 'saved';
			state.isready = 1;
			break;
		case 'dataBufferShift':
			state.dataBuffer = [ ...state.dataBuffer.splice(1) ];
			state.isready = 1;
			if (state.questionBuffer.length === 0 && state.dataBuffer.length === 0) state.status = 'saved';
			break;
		case 'SocketError':
			state.status = 'error';
			break;
		case 'setScreenFunction':
			state.screen = action.payload;
			break;

		default:
			break;
	}
	return state;
};

export default SocketState;
