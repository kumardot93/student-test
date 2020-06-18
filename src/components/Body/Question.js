import React, { Component } from 'react';
import styles from './css/Question.module.css';
import Choices from './Choices.js';
import Image from './Image.js';
import Initial from './Initial.js';

import { connect } from 'react-redux';
import { updateAnswer, markForLater } from './../../redux/actions/Test.js';

class Question extends Component {
	check = () => {
		// check user given answer with actual answer
		let res = '';
		if (this.props.submitted) {
			if (this.props.question.fields.type == 'F') {
				if (
					this.props.question.answer.toLocaleLowerCase() ==
					this.props.question.fields.answer.toLocaleLowerCase()
				)
					res = <h6 className="text-success ml-4 mt-4 pl-1">Correct</h6>;
				else res = <h6 className="text-danger ml-4 mt-4 pl-1">Wrong</h6>;
			} else if (this.props.question.fields.type == 'O' || this.props.question.fields.type == 'M') {
				if (this.props.question.answer.join('') == this.props.question.fields.answer)
					res = <h6 className="text-success ml-4 mt-4 pl-1">Correct</h6>;
				else res = <h6 className="text-danger ml-4 mt-4 pl-1">Wrong</h6>;
			}
		}
		return res;
	};

	render() {
		return (
			<div id={styles.questionMain} className="p-1 m-1 flex-grow-1 bg-light">
				{this.props.question === undefined || this.props.active === -1 ? (
					<Initial display="none" />
				) : (
					<React.Fragment>
						<div className="d-flex flex-row align-items-top">
							<h2 className={[ 'd-inline mr-0 mr-2', styles.qno ].join(' ')}>
								Q.{this.props.active + 1}
							</h2>
							<h5 className={[ 'mt-3 mr-0 pr-0 ml-1', styles.qinfo ].join(' ')}>
								{this.props.question.fields.text}
							</h5>
							<div className={[ styles.rightpannel, 'ml-auto mr-3 mt-2' ].join(' ')}>
								<h6>{this.props.question.fields.marks}</h6>
								<h6>{this.props.question.fields.type}</h6>
							</div>
						</div>

						<Image />
						<br />

						{this.props.question.fields.type === 'O' || this.props.question.fields.type === 'M' ? (
							<Choices type={this.props.question.fields.type} submitted={this.props.submitted} />
						) : this.props.question.fields.type !== 'D' ? (
							<React.Fragment>
								<label className="ml-4 pl-4 mt-4">Answer:</label>
								<input
									className={[ 'ml-4 pl-4 form-control w-50', styles.ansInp ].join(' ')}
									style={{ display: 'inline' }}
									type="text"
									name="answer"
									value={this.props.question.answer}
									onChange={(ev) => this.props.updateAnswer(ev.target.value)}
									readOnly={this.props.submitted}
								/>
							</React.Fragment>
						) : (
							<div className="d-flex align-items-strech flex-column pr-4 mr-4 ml-4">
								<label className="mt-4">Answer:</label>
								<textarea
									className={[ 'pl-4 form-control mb-4' ].join(' ')}
									style={{ display: 'inline' }}
									type="text"
									name="answer"
									rows="8"
									cols="20"
									value={this.props.question.answer}
									onChange={(ev) => this.props.updateAnswer(ev.target.value)}
									readOnly={this.props.submitted}
								/>
							</div>
						)}
						{this.check()}
						<br />
						<button
							className="float-right btn btn-info mt-2"
							style={{ display: this.props.submitted ? 'none' : 'block' }}
							onClick={this.props.mark}
						>
							Mark for later
						</button>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		question: state.Test.questions[state.Test.active],
		test: state.Test
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateAnswer: (ans) => dispatch(updateAnswer(ans)),
		mark: () => dispatch(markForLater())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
