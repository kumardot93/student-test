const Test = (state = { active: -1, questions: [], fields: {} }, action) => {
	state = { ...state };
	switch (action.type) {
		case 'updateTestData':
			state = { ...action.payload };
			break;

		case 'updateActive':
			state.active = action.payload;
			if (state.active != -1) state.questions[state.active].state[0] = 1;
			break;

		case 'updateActiveAnswer':
			state.questions[state.active].answer = action.payload;
			state.questions[state.active] = { ...state.questions[state.active] };
			if (state.questions[state.active].fields.type == 'F') {
				if (state.questions[state.active].answer == '') {
					state.questions[state.active].state[1] = 0;
				} else state.questions[state.active].state[1] = 1;
			} else if (
				state.questions[state.active].fields.type == 'O' ||
				state.questions[state.active].fields.type == 'M'
			) {
				console.log(state.questions[state.active].answer.join(''));
				console.log('OM');
				if (state.questions[state.active].answer.join('') == '0000') {
					state.questions[state.active].state[1] = 0;
				} else state.questions[state.active].state[1] = 1;
			}
			break;
		case 'markForLater':
			state.questions[state.active].state[2] = (state.questions[state.active].state[2] + 1) % 2;
		case 'updateQuestions':
			state.questions = [ ...action.payload ];
			console.log('state after saving', state);
			break;
		default:
			break;
	}
	return state;
};

export default Test;
