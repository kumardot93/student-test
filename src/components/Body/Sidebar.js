import React, { Component } from 'react';
import styles from './css/Sidebar.module.css';
import btnStyles from './css/QuestionsBtns.module.css';
import Question from './Question.js';
import QuestionsBtns from './QuestionsBtns.js';
import Timer from './Timer.js';
import ReactDOM from 'react-dom';
import SubmitOverlay from './SubmitOverlay.js';

import { connect } from 'react-redux';
import { addToDataBuffer } from './../../redux/actions/SocketState.js';

//Side bar or the container of the question buttons also the entry point for the qustion body
class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuBtn: btnStyles.btnNavDef,
			timer: '', //For rendering timer component , see component did mount , in component did mount because we neew to pass the reference to teh submit button after its mounted
			btnSpinner: 'none'
		};

		this.submit = null; //reference to submit button
	}

	componentDidMount = () => {
		//Stores time component fot cowndown and rendering in UI
		if (this.props.testData.duration != -1 && !this.props.submitted)
			this.setState({ timer: <Timer duration={this.props.testData.duration} submit={this.sendResult} /> }); //Timer does cowndown for given duation in minutes and automatically submits after the times ends
	};

	sendResult = () => {
		this.setState({ btnSpinner: '' }); //Display the spinner
		//Calculate marks and send result
		if (this.props.snapsId) clearInterval(this.props.snapsId);
		let marks_list = [];
		this.props.questions.forEach((data, index) => {
			let m = 0;
			switch (data.fields.type) {
				case 'F':
					if (data.answer === data.fields.answer) m = data.fields.marks;
					break;
				case 'M':
				case 'O':
				case 'ON':
				case 'MN':
					if (data.answer.join('') === data.fields.answer) {
						m = data.fields.marks;
					} else if (data.fields.type === 'MN' || data.fields.type === 'ON') m = -1;
					break;
				case 'MP':
				case 'MNP':
					let ans = data.fields.answer.split('');
					let res = data.answer.join('');
					let mk = [ 0, 0, 0 ];
					ans.forEach((a, index) => {
						if (a === '1') {
							mk[1] += 1;
							if (res[index] === '1') mk[0] += 1;
						} else if (a !== res[index]) mk[2] = 1;
					});
					if (mk[2] === 1) m = data.fields.type === 'MNP' ? -1 : 0;
					else m = mk[0] / Math.max(1, mk[1]) * data.fields.marks;
					m.toFixed(2);
					break;
			}
			marks_list = [ ...marks_list, m ];
		});
		let res = { type: 'submit', marks: marks_list };
		this.props.addToDataBuffer(JSON.stringify(res));
	};

	submit_result = () => {
		if (this.props.submitted === 1) {
			this.props.enter(2);
		} else {
			let el = document.getElementById('overlay');
			el.style.display = 'block';
			ReactDOM.render(<SubmitOverlay sendResult={this.sendResult} />, el);
		}
	};

	render() {
		return (
			<React.Fragment>
				<div id={styles.sidebarMain} className="p-1 bg-secondary">
					<h1 className="display-4 bg-info text-light pl-2 mb-1 d-flex flex-row" id={styles.sideHead}>
						<button
							className="material-icons mr-0 pr-0"
							id={styles.menuBtn}
							onClick={(ev) => {
								if (this.state.menuBtn === 'd-flex ' + btnStyles.btnNavDef)
									setTimeout(() => this.setState({ menuBtn: btnStyles.btnNavDef }), 400);
								this.setState({
									menuBtn:
										this.state.menuBtn === btnStyles.btnNavDef
											? 'd-flex ' + this.state.menuBtn
											: this.state.menuBtn === 'd-flex ' + btnStyles.btnNavDef
												? btnStyles.btnNavRem + ' d-flex'
												: 'd-flex ' + btnStyles.btnNavDef
								});
							}}
						>
							menu
						</button>
						Questions
						<button
							id={styles.addBtn}
							className="btn btn-dark ml-auto"
							ref={(el) => (this.submit = el)}
							onClick={() => {
								this.submit_result();
							}}
							disabled={this.state.btnSpinner === ''}
						>
							{this.props.submitted ? 'Result' : 'Submit'}
							<span
								className="ml-1 spinner-border spinner-border-sm"
								style={{ display: this.state.btnSpinner }}
							/>
						</button>
					</h1>

					{/* Container of all the qustion numbers as buttons to navigate */}
					<QuestionsBtns menuDisplay={this.state.menuBtn} submitted={this.props.submitted} />
					{this.state.timer}
				</div>
				{/* Container of the Question body */}
				<Question submitted={this.props.submitted} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pk: state.Test.pk,
		testData: state.Test.fields,
		questions: state.Test.questions,
		snapsId: state.SocketState.snapsId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToDataBuffer: (data) => dispatch(addToDataBuffer(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
