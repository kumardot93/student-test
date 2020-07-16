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
			if (index === this.props.active) cls = [ 'btn-primary', styles.active ].join(' '); //if active
			return (
				<button
					className={[ 'btn m-2', styles.btns, cls ].join(' ')}
					key={index}
					onClick={() => this.props.updateActive(index)}
					//update active questin on change also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
				>
					{index + 1}
				</button>
			);
		});
		return (
			<div className={[ 'd-block m-1', styles.qBtnsCont ].join(' ')}>
				<div
					className={[ 'align-items-stretch', this.props.menuDisplay, styles.bottomNav ].join(' ')}
					style={
						document.body.clientWidth < 950 ? this.props.submitted ? ( //Sizing and placement for the side bar
							{}
						) : (
							{ top: '55px', height: 'calc(100vh - 88px)' }
						) : (
							{}
						)
					}
				>
					<button
						className={[ 'btn m-1', -1 === this.props.active ? 'btn-primary' : 'btn-light' ].join(' ')}
						onClick={() => this.props.updateActive(-1)}
						//update active questin to test data also push to buffer for sending to backend i there is any change se the corrosponding action in redux/action/Top.js
						active={-1 === this.props.active}
					>
						Test Description
					</button>
					<button className={[ 'btn m-1', 'btn-light', 'd-none' ].join(' ')} disabled={true}>
						Camera
					</button>
					<button className={[ 'btn m-1', 'btn-light' ].join(' ')} disabled={true}>
						Request Feature
					</button>
					<button className={[ 'btn m-1 mt-auto', 'btn-warning' ].join(' ')} disabled={true}>
						Help Desk
					</button>
				</div>

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
