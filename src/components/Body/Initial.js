import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SetVideoInput from './SetViideoInput.js';
import styles from './css/Initial.module.css';
import VideoInput from './../../VideoSupport.js';

import { connect, Provider } from 'react-redux';
import { addToDataBuffer, switchFer } from './../../redux/actions/SocketState.js';
import { updateActive } from './../../redux/actions/Test.js';
import Store from './../../redux/Store.js';

class Initial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marks: 0, //For storing total marks
			btnSpinner: 'none'
		};
		this.enterBtn = null;
	}

	static getDerivedStateFromProps = (props, state) => {
		let m = 0; //Calculating total marks
		props.questions.forEach((qs) => {
			m += qs.fields.marks;
		});
		return {
			marks: m
		};
	};

	ferManager = (event) => {
		//manages turning on and off of FER engine
		let res;
		if (!this.props.fer) {
			document.getElementById('overlay').style.display = 'block';
			ReactDOM.render(
				//Renders SetVideoInput(Overlay form ) for initilizing FER engine
				<Provider store={Store}>
					<SetVideoInput addToDataBuffer={this.props.addToDataBuffer} message={this.props.message} />
				</Provider>,
				document.getElementById('overlay')
			);
			// res = { type: 'initilizeFER' };
			// this.props.addToDataBuffer(JSON.stringify(res));
		} else {
			VideoInput.stopVideo(); //Stops webcam
			res = { type: 'closeFER' };
			this.props.addToDataBuffer(JSON.stringify(res)); //Sends request over web socket to backend for stopping disconnecting fer engine
			this.props.switchFer(0); //Switches fer state from Socketstate back to 0; 0: fer off, 1: fer onn
		}
	};

	render() {
		return (
			<div id={styles.entry} className="p-2 bg-light pb-4">
				<h1 className="text-center">{this.props.title}</h1>
				<p className="text-center" id={styles.desc}>
					{this.props.description}
				</p>
				<button
					ref={(el) => (this.enterBtn = el)}
					onClick={() => {
						this.setState({ btnSpinner: '' });
						if ([ 'connected', 'saving', 'saved' ].includes(this.props.socketStatus)) {
							this.props.enter(1);
							this.props.updateActive(0);
							this.props.addToDataBuffer(JSON.stringify({ type: 'enter' }));
							// document.body.requestFullscreen();
						} else {
							setTimeout(() => {
								//To click the button every 2 seconds till the data is not fetched
								this.enterBtn.click();
							}, 5000);
						}
					}}
					className="btn btn-success m-4 pl-4 pr-4 m-auto"
					style={{ display: this.props.display }}
				>
					Enter
					<span
						className="ml-2 spinner-border spinner-border-sm"
						style={{ display: this.state.btnSpinner }}
					/>
				</button>
				<div class="custom-control custom-switch m-4">
					<input
						type="checkbox"
						class="custom-control-input"
						id="customSwitch1"
						value="fer"
						checked={this.props.fer}
						onChange={this.ferManager}
					/>
					<label class="custom-control-label" for="customSwitch1">
						Expression Analyser
					</label>
				</div>
				<div className="mt-4" id={styles.details}>
					<span>Total Marks: {this.state.marks}</span>
					<br />
					<span>Instructor: {this.props.testData.instructor}</span>
					<br />
					{this.props.testData.duration == -1 ? (
						''
					) : (
						<span>Time:{this.props.testData.duration} minutes </span>
					)}
				</div>
				<div className="ml-1 pt-4">
					<ul className="float-left mt-4">
						<li>D : Descriptive</li>
						<li>F : Fill</li>
						<li> O : One Option Correct </li>
						<li>ON : One Option Correct(Negative Marking) </li>
						<li>M : Multu Option Correct</li>
						<li>MP : Multu Option Correct(Partially correct)</li>
						<li> MN : Multu Option Correct(Negative Marking) </li>
						<li>MPN : Multu Option Correct(Patrially correct and Neative marking)</li>
					</ul>
					<div className="float-left ml-4 pl-4 mt-3">
						<button className="btn btn-dark mr-4" />
						<label className="mt-4">Unvisited</label>
						<br />

						<button className="btn btn-danger mr-4" />
						<label>Unanswered</label>
						<br />
						<button className="btn btn-warning mr-4" />
						<label>Marked For Later</label>
						<br />
						<button className="btn btn-info mr-4" />
						<label>Answered and Marked</label>
						<br />
						<button className="btn btn-success mr-4" />
						<label>Answered</label>
						<br />
						<ul>
							<li className="text-danger mt-1">
								<p className="mt-4">Do not refresh the page during the test</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		title: state.Test.fields ? state.Test.fields.title : '',
		description: state.Test.fields ? state.Test.fields.description : '',
		questions: state.Test.questions,
		testData: state.Test.fields,
		socketStatus: state.SocketState.status,
		snapsId: state.SocketState.snapsId,
		fer: state.SocketState.fer,
		message: state.SocketState.message
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToDataBuffer: (data) => dispatch(addToDataBuffer(data)),
		switchFer: (num) => dispatch(switchFer(num)),
		updateActive: (index) => dispatch(updateActive(index))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
