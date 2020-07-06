import React, { Component } from 'react';
import styles from './css/Main.module.css';
import Sidebar from './Sidebar.js';
import Initial from './Initial.js';
import Result from './result.js';
import { extractKey } from './../../SocketManager.js';

import { connect } from 'react-redux';
import { updateTestData } from './../../redux/actions/Test.js';

//Entry point for the main body
class Main extends Component {
	//fetching and saving the test data
	state = {
		enter: 0 //Determines what to render to the main body
	};
	// fetchData = (key) => {
	// 	//fetches all the test data at once
	// 	fetch(window.base + '/material/api/test/data/' + key + '/', { credentials: window.cred })
	// 		.then((Response) => Response.json())
	// 		.then((data) => this.props.updateTestData(data))
	// 		.catch((error) => alert('Error fetching data: possible reasons unauthorised access aur connection issue '));
	// };

	//Fetching data after component has been mounted
	// componentDidMount = () => {
	//extracts key from url and fetchs all the test data at once
	// let key = extractKey();
	// this.fetchData(key);
	// };

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
		updateTestData: (data) => dispatch(updateTestData(data)) //to store the fetched test data
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
