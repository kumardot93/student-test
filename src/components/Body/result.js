import React, { useState } from 'react';
import styles from './css/Initial.module.css';

import { connect } from 'react-redux';

function Result(props) {
	let total = 0;
	let marks = 0;
	props.questions.forEach((data, index) => {
		total += data.fields.marks;
		marks += data.marks;
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
