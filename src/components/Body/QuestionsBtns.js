import React, { Component } from 'react';
import styles from './css/QuestionsBtns.module.css';

import { connect } from 'react-redux';
import { updateActive } from './../../redux/actions/Test.js';

class QuestionsBtns extends Component {
	render() {
		let questions = '';
		//mapping question buttons from all the available question in redux state
		questions = this.props.questions.map((data, index) => {
			let state = data.state.join('');
			let cls = '';
			switch (state) {
				case '100':
					cls = 'btn-danger'; //if not answered
					break;
				case '010':
				case '110':
					cls = 'btn-success'; //if answered
					break;
				case '001':
				case '101':
					cls = 'btn-warning'; //if marked for later
					break;
				case '011':
				case '111':
					cls = 'btn-info'; //if answered and marked for later
					break;
				default:
					cls = 'btn-dark'; //if unvisited
			}
			if (index === this.props.active) cls = 'btn-primary'; //if active
			return (
				<button
					className={[ 'btn m-2', styles.btns, cls ].join(' ')}
					key={index}
					onClick={() => this.props.updateActive(index)}
					//update active questin on change also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
					active={index === this.props.active}
				>
					{index + 1}
				</button>
			);
		});
		return (
			<div id={styles.qBtnsCont}>
				<button
					className={[
						'btn m-2 form-control w-25',
						styles.btns,
						-1 === this.props.active ? 'btn-primary' : 'btn-dark'
					].join(' ')}
					onClick={() => this.props.updateActive(-1)}
					//update active questin to test data also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
					active={-1 === this.props.active}
				>
					Test
				</button>{' '}
				{questions}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		questions: state.Test.questions
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateActive: (index) => dispatch(updateActive(index))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsBtns);
