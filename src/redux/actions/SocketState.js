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
