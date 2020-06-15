import store from './../Store.js';
import { addToBuffer, addToDataBuffer } from './SocketState.js';

export function updateTestData(data) {
	let questions = data.questions.map((data) => {
		data.answer = '';
		data.state = [ 0, 0, 0 ]; //[0] is for visited at, [1] is for answered and [2] is for mared
		if (data.fields.type == 'O' || data.fields.type == 'M') data.answer = [ 0, 0, 0, 0 ];
		return data;
	});
	data['questions'] = Object.assign([], questions);
	data['active'] = -1;
	return {
		type: 'updateTestData',
		payload: data
	};
}

// export function AddingToBuffer() {
// 	let test = store.getState().Test;
// 	if (test.active !== -1)
// 		if (test.questions[test.active].changed === 1) {
// 			store.dispatch(addToBuffer(test.active));
// 			return;
// 		}
// 	//Push the index of the last active question to the buffer of Socket State if there is any change
// 	if (test.active === -1 && test.changed === 1) {
// 		let dict = { type: 'testUpdate', payload: { title: test.fields.title, description: test.fields.description } };
// 		dict = JSON.stringify(dict);
// 		store.dispatch(addToDataBuffer(dict));
// 	}
// }

export function updateActive(index) {
	// AddingToBuffer();
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
