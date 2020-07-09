import React, { Component } from 'react';
import styles from './css/Sidebar.module.css';
import Question from './Question.js';
import QuestionsBtns from './QuestionsBtns.js';
import Timer from './Timer.js';

import { connect } from 'react-redux';
import { addToDataBuffer } from './../../redux/actions/SocketState.js';

//Side bar or the container of the question buttons also the entry point for the qustion body
class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timer: '', //For rendering timer component , see component did mount , in component did mount because we neew to pass the reference to teh submit button after its mounted
			btnSpinner: 'none'
		};

		this.submit = null; //reference to submit button
	}

	componentDidMount = () => {
		//Stores time component fot cowndown and rendering in UI
		if (this.props.testData.duration != -1 && !this.props.submitted)
			this.setState({ timer: <Timer duration={this.props.testData.duration} submit={this.submit} /> }); //Timer does cowndown for given duation in minutes and automatically submits after the times ends
	};

	sendResult = () => {
		//Calculate marks and send result
		this.setState({ btnSpinner: '' });
		if (this.props.submitted === 1) {
			this.props.enter(2);
		} else {
			console.log('snap id : ', this.props.snapsId);
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
		}
	};

	render() {
		return (
			<React.Fragment>
				<div id={styles.sidebarMain} className="p-1 bg-secondary">
					<h1 className="display-4 bg-info text-light pl-2" id={styles.sideHead}>
						Questions
						<button
							id={styles.addBtn}
							className="btn btn-dark"
							ref={(el) => (this.submit = el)}
							onClick={() => {
								this.sendResult();
							}}
						>
							{this.props.submitted ? 'Result' : 'Submit'}
							<span
								className="ml-1 spinner-border spinner-border-sm"
								style={{ display: this.state.btnSpinner }}
							/>
						</button>
					</h1>

					{/* Container of all the qustion numbers as buttons to navigate */}
					<QuestionsBtns />
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
