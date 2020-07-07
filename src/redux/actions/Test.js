import store from './../Store.js';
import { addToQuestionBuffer } from './SocketState.js';

export function updateTestData(data) {
	let questions = data.questions.map((data) => {
		data.answer = '';
		data.state = [ 0, 0, 0 ]; //[0] is for visited at, [1] is for answered and [2] is for mared
		data.changed = 0;
		if (
			data.fields.type === 'O' ||
			data.fields.type === 'M' ||
			data.fields.type === 'ON' ||
			data.fields.type === 'MP' ||
			data.fields.type === 'MN' ||
			data.fields.type === 'MPN'
		)
			data.answer = [ 0, 0, 0, 0 ];
		return data;
	});
	data['questions'] = Object.assign([], questions);
	data['active'] = -1;
	return {
		type: 'updateTestData',
		payload: data
	};
}

export function updateTestDataForReconnected(data) {
	let questions = data.questions.map((data) => {
		data.changed = 0;
		return data;
	});
	data.questions = Object.assign([], questions);
	data.active = -1;
	return {
		type: 'updateTestData',
		payload: data
	};
}

export function AddToBuffer() {
	let test = store.getState().Test;
	if (test.active !== -1) {
		if (test.questions[test.active].changed === 1) {
			store.dispatch(addToQuestionBuffer(test.active));
			return;
		}
	}
}

export function updateActive(index) {
	AddToBuffer();
	return {
		type: 'updateActive',
		payload: index
	};
}

export function updateAnswer(ans) {
	return {
		type: 'updateActiveAnswer',
		payload: ans
	};
}

export function markForLater() {
	return {
		type: 'markForLater',
		payload: null
	};
}

export function submitted(marks) {
	return {
		type: 'submitted',
		payload: marks
	};
}
