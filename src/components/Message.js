import React, { useState, useEffect, Component } from 'react';

import { connect } from 'react-redux';
import { newMessage } from './../redux/actions/SocketState.js';

class Message extends Component {
	state = {
		clearingId: null
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.message !== '' && prevProps.message !== this.props.message) {
			clearTimeout(this.state.clearingId);
			this.setState({ clearingId: setTimeout(() => this.props.clearMessage(), 10000) });
		}
	};

	render() {
		return <React.Fragment>{this.props.message}</React.Fragment>;
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.SocketState.message.message // receives message from socket state and dispay it to bottom message bar
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearMessage: () => dispatch(newMessage({ code: null, message: '' }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
