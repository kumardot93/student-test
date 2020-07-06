const SocketState = (
	state = { socket: null, status: 'connecting', buffer: [], dataBuffer: [], isready: 0 },
	action
) => {
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
		default:
			break;
	}
	return state;
};

export default SocketState;
