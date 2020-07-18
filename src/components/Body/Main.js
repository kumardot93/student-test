import React, { Component } from 'react';
import styles from './css/Main.module.css';
import Sidebar from './Sidebar.js';
import Initial from './Initial.js';
import Result from './result.js';
import { extractKey } from './../../SocketManager.js';

import { connect } from 'react-redux';
import { setScreenFunction } from './../../redux/actions/SocketState.js';

//Entry point for the main body
class Main extends Component {
	//fetching and saving the test data
	constructor(props) {
		super(props);
		this.state = {
			enter: 0 //Determines what to render to the main body
		};
		this.props.setScreenFunction(this.enter);
	}

	enter = (val) => {
		//to change the value of this.state.enter
		this.setState({ enter: val });
	};

	screen = () => {
		let res;
		switch (this.state.enter) {
			case 0:
				res = <Initial enter={this.enter} display="block" />; //the first screen to apear
				break;
			case 1:
				res = <Sidebar enter={this.enter} submitted={0} />;
				break;
			case 2:
				res = <Result enter={this.enter} />;
				break;
			case 3:
				res = <Sidebar enter={this.enter} submitted={1} />;
				break;
		}

		return res;
	};

	render() {
		return (
			<div
				id={styles.main}
				className={
					this.state.enter == 1 ? [ 'p-1 d-flex pt-2', styles.fullScreen ].join(' ') : 'p-1 d-flex pt-2'
				}
			>
				{this.screen()}
			</div>
		);
	}
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
	return {
		setScreenFunction: (func) => dispatch(setScreenFunction(func))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
