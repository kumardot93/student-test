import React, { Component } from 'react';
import styles from './css/Initial.module.css';

import { connect } from 'react-redux';
import Question from './Question';

class Initial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marks: 0
		};
	}

	static getDerivedStateFromProps = (props, state) => {
		let m = 0;
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
				</div>
				<div className="ml-1">
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
