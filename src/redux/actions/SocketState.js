export function setSocket(ws) {
	return {
		type: 'setSocket',
		payload: ws
	};
}

export function connected() {
	return {
		type: 'connected',
		payload: null
	};
}

export function disconnected() {
	return {
		type: 'disconnected',
		payload: null
	};
}

export function addToQuestionBuffer(index) {
	return {
		type: 'addToQuestionBuffer',
		payload: index
	};
}

export function addToDataBuffer(data) {
	return {
		type: 'addToDataBuffer',
		payload: data
	};
}

export function sendingData() {
	return {
		type: 'sendingData',
		payload: null
	};
}

export function savedQuestion() {
	//is ready flag to 1 and  update socket status and shift the buffer array
	return {
		type: 'savedQuestion',
		payload: null
	};
}

export function dataBufferShift() {
	//is ready flag to 1 and  update socket status and shift the  data buffer
	return {
		type: 'dataBufferShift',
		payload: null
	};
}

export function socketError() {
	return {
		type: 'SocketError',
		payload: null
	};
}

export function setScreenFunction(func) {
	return {
		type: 'setScreenFunction',
		payload: func
	};
}

export function setSnapsId(id) {
	return {
		type: 'setSnapsId',
		payload: id
	};
}

export function switchFer(num) {
	return {
		type: 'switchFer',
		payload: num
	};
}

export function newMessage(msg) {
	return {
		type: 'newMessage',
		payload: msg
	};
}
