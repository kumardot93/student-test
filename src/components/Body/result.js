import React, { useState } from 'react';
import styles from './css/Initial.module.css';

import { connect } from 'react-redux';

function Result(props) {
	console.log('rendtring result');
	let total = 0;
	let marks = 0;
	props.questions.forEach((data, index) => {
		total += data.fields.marks;
		let m = 0;
		if (data.fields.type == 'F') {
			if (data.answer === data.fields.answer) m = data.fields.marks;
		} else if (data.fields.type === 'O' || data.fields.type === 'M') {
			if (data.answer.join('') == data.fields.answer) {
				m = data.fields.marks;
			}
		}
		marks += m;
	});

	return (
		<div id={styles.entry} className="p-4 bg-light m-4 text-center">
			<h1 className="display-3">Results</h1>
			<h1 className="display-2">
				{marks}/{total}
			</h1>
			<button className="btn btn-primary" onClick={() => props.enter(3)}>
				check answers
			</button>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		questions: state.Test.questions,
		test: state.Test
	};
};

export default connect(mapStateToProps)(Result);
