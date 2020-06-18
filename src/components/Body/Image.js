import React from 'react';

import { connect } from 'react-redux';

function Image(props) {
	return (
		<React.Fragment>
			<img
				className={[ 'm-2 ml-4 pl-4 w-50' ].join(' ')}
				alt="not found"
				style={{
					display: props.question.fields.image === '' ? 'none' : 'inline-block'
				}}
				src={props.question.fields.image === '' ? '#' : window.media_url + props.question.fields.image}
			/>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		active: state.Test.active,
		question: state.Test.questions[state.Test.active]
	};
};

export default connect(mapStateToProps)(Image);
