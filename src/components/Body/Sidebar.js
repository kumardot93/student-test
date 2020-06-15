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
			timer: '' //For rendering timer component , see component did mount , in component did mount because we neew to pass the reference to teh submit button after its mounted
		};

		this.submit = null; //reference to submit button
	}

	componentDidMount = () => {
		if (this.props.testData.duration != -1 && !this.props.submitted)
			this.setState({ timer: <Timer duration={this.props.testData.duration} submit={this.submit} /> });
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
							onClick={() => this.props.enter(2)}
						>
							{this.props.submitted ? 'Result' : 'Submit'}
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
		testData: state.Test.fields
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
