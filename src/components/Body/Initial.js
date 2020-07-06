import React, { Component } from 'react';
import styles from './css/Initial.module.css';

import { connect } from 'react-redux';
import Question from './Question';

class Initial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marks: 0 //For storing total marks
		};
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

	render() {
		return (
			<div id={styles.entry} className="p-2 bg-light">
				<h1 className="text-center">{this.props.title}</h1>
				<p className="text-center" id={styles.desc}>
					{this.props.description}
				</p>
				<button
					onClick={(ev) => this.props.enter(1)}
					className="btn btn-success m-4 pl-4 pr-4 m-auto"
					style={{ display: this.props.display }}
				>
					Enter
				</button>
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
	console.log('redux: ', state);
	return {
		title: state.Test.fields ? state.Test.fields.title : '',
		description: state.Test.fields ? state.Test.fields.description : '',
		questions: state.Test.questions,
		testData: state.Test.fields
	};
};

export default connect(mapStateToProps)(Initial);
