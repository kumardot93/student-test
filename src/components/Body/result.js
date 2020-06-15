import React, { useState } from 'react';
import styles from './css/Initial.module.css';

import { connect } from 'react-redux';

function Result(props) {
	let total = 0;
	let marks = 0;
	let res = [];
	let [ sent, updateSent ] = useState(0);
	res = props.questions.map((data, index) => {
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
		return { ...data, marks: m };
	});
	let form = new FormData();
	form.append('response', JSON.stringify(res));
	fetch(window.base + '/material/api/test/saveResponse/' + props.test.pk + '/', {
		method: 'POST',
		credentials: window.cred,
		body: form
	})
		.then(() => updateSent(1))
		.catch((err) => alert(err));
	console.log(res);

	return (
		<div id={styles.entry} className="p-4 bg-light m-4 text-center">
			{sent ? (
				<React.Fragment>
					<h1 className="display-3">Results</h1>
					<h1 className="display-2">
						{marks}/{total}
					</h1>
					<button className="btn btn-primary" onClick={() => props.enter(3)}>
						check answers
					</button>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="spinner-grow mt-4" />
					<div className="spinner-grow mt-4" />
					<div className="spinner-grow mt-4" />
					<div className="spinner-grow mt-4" />
				</React.Fragment>
			)}
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
