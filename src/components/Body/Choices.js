import React, { Component } from 'react';
import styles from './css/Question.module.css';

import { connect } from 'react-redux';
import { updateAnswer } from './../../redux/actions/Test.js';

class Choices extends Component {
	resetAnswer = (ev) => {
		//To reset answer
		this.props.updateAnswer([ 0, 0, 0, 0 ]);
	};

	answerHandler = (ev, index) => {
		let ans = this.props.question.answer;
		if (this.props.question.fields.type === 'O') {
			ans = [ 0, 0, 0, 0 ];
			ans[index - 1] = 1;
		} else {
			ans[index - 1] = (ans[index - 1] + 1) % 2;
		}
		this.props.updateAnswer(ans);
	};

	render() {
		return (
			<React.Fragment>
				<div className={[ 'p-0 d-flex w-100', styles.choicesCont ].join(' ')}>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="form-check mt-4 ml-4 pl-4">
							<input
								className="form-check-input"
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 1)}
								checked={this.props.question.answer[0] == 1}
							/>
							<label className={[ 'form-check-label', styles.choicesLabel ].join(' ')}>
								{this.props.choices[0] !== undefined ? this.props.choices[0] : ''}
							</label>
						</div>
					</div>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="form-check mt-4 ml-4 pl-4">
							<input
								className="form-check-input"
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 2)}
								checked={this.props.question.answer[1] == 1}
							/>
							<label className={[ 'form-check-label', styles.choicesLabel ].join(' ')}>
								{this.props.choices[1] !== undefined ? this.props.choices[1] : ''}
							</label>
						</div>
					</div>
				</div>
				<div className={[ 'p-0 d-flex w-100', styles.choicesCont ].join(' ')}>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="form-check mt-4 ml-4 pl-4">
							<input
								className="form-check-input"
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 3)}
								checked={this.props.question.answer[2] == 1}
							/>
							<label className={[ 'form-check-label', styles.choicesLabel ].join(' ')}>
								{this.props.choices[2] !== undefined ? this.props.choices[2] : ''}
							</label>
						</div>
					</div>
					<div className={[ 'p-0 d-flex w-100 align-items-baseline', styles.choicesCont ].join(' ')}>
						<div className="form-check mt-4 ml-4 pl-4">
							<input
								className="form-check-input"
								type="radio"
								onClick={(ev) => this.answerHandler(ev, 4)}
								checked={this.props.question.answer[3] == 1}
							/>
							<label className={[ 'form-check-label', styles.choicesLabel ].join(' ')}>
								{this.props.choices[0] !== undefined ? this.props.choices[3] : ''}
							</label>
						</div>
					</div>
				</div>
				<button
					className="btn btn-danger ml-4 mt-2 p-1"
					style={{ fontSize: 'x-small', display: this.props.submitted ? 'none' : '' }}
					onClick={this.resetAnswer}
				>
					reset
				</button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		choices:
			state.Test.questions[state.Test.active].fields.jsonChoices !== ''
				? JSON.parse(state.Test.questions[state.Test.active].fields.jsonChoices)
				: [],
		question: state.Test.questions[state.Test.active]
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateAnswer: (ans) => dispatch(updateAnswer(ans))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Choices);
