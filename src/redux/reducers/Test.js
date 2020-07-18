const Test = (state = { active: -1, questions: [], fields: {} }, action) => {
	state = { ...state };
	switch (action.type) {
		case 'updateTestData':
			state = { ...action.payload };
			break;

		case 'updateActive':
			state.active = action.payload;
			if (state.active != -1) {
				try {
					state.questions[state.active].state[0] = 1;
				} catch (err) {
					alert("Requested Questino dosen't exists");
				}
			}
			break;

		case 'updateActiveAnswer':
			state.questions[state.active].answer = action.payload;
			state.questions[state.active] = { ...state.questions[state.active] };
			if ([ 'F', 'D' ].includes(state.questions[state.active].fields.type)) {
				if (state.questions[state.active].answer == '') {
					state.questions[state.active].state[1] = 0;
				} else {
					state.questions[state.active].state[1] = 1;
				}
			} else if ([ 'O', 'M', 'ON', 'MP', 'MN', 'MNP' ].includes(state.questions[state.active].fields.type)) {
				if (state.questions[state.active].answer.join('') == '0000') {
					state.questions[state.active].state[1] = 0;
				} else state.questions[state.active].state[1] = 1;
			}
			state.questions[state.active].changed = 1; //raising the changed falg to 1 for sending the data over ws
			break;
		case 'markForLater':
			state.questions[state.active].state[2] = (state.questions[state.active].state[2] + 1) % 2;
			state.questions[state.active].changed = 1; //raising the changed falg to 1 for sending the data over ws
			break;
		case 'submitted': //used afetr submtting to update marks for each question
			state.questions = state.questions.map((question, index) => {
				return {
					...question,
					marks: action.payload[index]
				};
			});
			break;
		default:
			break;
	}
	return state;
};

export default Test;
