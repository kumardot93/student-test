import React, { Component } from 'react';
import styles from './css/Sidebar.module.css';
import Question from './Question.js';
import QuestionsBtns from './QuestionsBtns.js';
import Timer from './Timer.js';

import { connect } from 'react-redux';

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
		if (this.props.testData.duration != -1 && !this.props.submitted)
			this.setState({ timer: <Timer duration={this.props.testData.duration} submit={this.submit} /> });
	};

	sendResult = () => {
		this.setState({ btnSpinner: '' });
		if (this.props.submitted === 1) {
			this.props.enter(2);
		} else {
			let res = this.props.questions.map((data, index) => {
				let m = 0;
				if (data.fields.type == 'F') {
					if (data.answer === data.fields.answer) m = data.fields.marks;
				} else if (data.fields.type === 'O' || data.fields.type === 'M') {
					if (data.answer.join('') == data.fields.answer) {
						m = data.fields.marks;
					}
				}
				return { ...data, marks: m };
			});
			let form = new FormData();
			form.append('response', JSON.stringify(res));
			fetch(window.base + '/material/api/test/saveResponse/' + this.props.pk + '/', {
				method: 'POST',
				credentials: window.cred,
				body: form
			})
				.then(() => this.props.enter(2))
				.catch((err) => alert(err));
		}
		this.setState({ btnSpinner: 'none' });
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
		questions: state.Test.questions
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
