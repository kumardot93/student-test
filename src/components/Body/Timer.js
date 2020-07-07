import React, { Component } from 'react';
import styles from './css/Main.module.css';

import { connect } from 'react-redux';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			started: props.startTime ? new Date(props.startTime).getTime() : new Date().getTime(),
			left: props.duration * 60 * 1000,
			duration: props.duration * 60 * 1000
		};
	}

	render() {
		let passed = new Date().getTime() - this.state.started;
		let sec = Math.floor(this.state.left / 1000);
		let minutes = Math.floor(sec / 60);
		sec = sec % 60;
		if (this.state.left > 0) setTimeout(() => this.setState({ left: this.state.duration - passed }), 1000);
		else this.props.submit.click();
		return (
			<h5 id={styles.timer}>
				Time: {minutes} : {sec}
			</h5>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		startTime: state.Test.startTime
	};
};

export default connect(mapStateToProps)(Timer);
