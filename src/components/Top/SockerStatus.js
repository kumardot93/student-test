import React from 'react';
import styles from './css/SocketStatus.module.css';

import { connect } from 'react-redux';

function SocketStatus(props) {
	let disp = 'default';
	console.log('status', props.socketStatus);
	switch (props.socketStatus) {
		case 'connecting':
		case 'saving':
		case 'reconnecting':
		case 'fetching':
			disp = (
				<h6 className="text-muted mb-0 pb-0" id={styles.status}>
					{props.socketStatus}
					<span id={styles.dot1}>.</span>
					<span id={styles.dot2}>.</span>
					<span id={styles.dot3}>.</span>
				</h6>
			);
			break;
		case 'saved':
			disp = (
				<h6 className="text-muted" id={styles.status}>
					All previous changes saved
				</h6>
			);
			break;
		case 'connected':
			disp = (
				<h6 className="text-muted" id={styles.status}>
					Connected
				</h6>
			);
			break;
		default:
			disp = (
				<h6 className="text-muted" id={styles.status}>
					{props.socketStatus}
				</h6>
			);
			break;
	}
	return <div className="ml-4 pb-0 mt-4">{disp}</div>;
}

const mapStateToProps = (state) => {
	return {
		socketStatus: state.SocketState.status
	};
};

export default connect(mapStateToProps)(SocketStatus);
