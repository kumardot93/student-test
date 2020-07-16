import React, { Component } from 'react';
import CloseOverlay from '../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';

class Submit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check1: 0,
			check2: 0,
			error_msg: null
		};
	}

	render() {
		return (
			<div className="container bg-light p-3" id={styles.overlaymain}>
				<h1 className="text-center display-4">Guidelines</h1>
				{this.state.error_msg == null ? (
					''
				) : (
					<label className="alert-danger form-control" style={{ width: '95%', height: 'auto' }}>
						{this.state.error_msg}
					</label>
				)}

				<p>
					This is a self assesment test, ment to develop and test your knowledge and skill. We expext you to
					take the test honestly and answer all questions on your own.
					<h5 className="mt-2">Important: </h5>
					<ul>
						<li>
							If there is any time limit on the test, you can see the cowndown timer at the bottom left.
							Once the time is over, the test will be submitted automatically
						</li>
						<li>
							Make sure the test is submitted successfully. Once the test is submitted successfully you
							will receive a message and then redirected to the result page
						</li>
						<li>
							In case of network problem or due to some reason you have to refresh the page, then all of
							you data will before interuption will still be preserved. But the timer will continue to run
							during the interuption period on the server
						</li>
						<li>
							If due to some reason you couldn't submit the test probarly are your answers is not
							evaluated proporly proporly the you can request evaluation from theh test result page
						</li>
						<li>Descriptive questions will be evaluated by the instructor himself</li>
						<li>
							In case of any technical support or complaint you can reach us by using help desk. For help
							desk navigate to the top left menu button
						</li>
					</ul>
				</p>
				<div class="form-check mt-4">
					<input
						class="form-check-input"
						type="checkbox"
						checked={this.state.check1}
						onClick={() => this.setState({ check1: (this.state.check1 + 1) % 2 })}
					/>
					<label class="form-check-label">
						I have read all the guideines carefully and I pledge to follow them.
					</label>
				</div>
				<div class="form-check mt-2">
					<input
						class="form-check-input"
						type="checkbox"
						checked={this.state.check2}
						onClick={() => this.setState({ check2: (this.state.check2 + 1) % 2 })}
					/>
					<label class="form-check-label">I pledge to take the test honestly.</label>
				</div>
				<button
					className="btn btn-primary d-block mt-4"
					onClick={(event) => {
						if (this.state.check1 && this.state.check2) CloseOverlay(event, styles.overlaymain);
						else this.setState({ error_msg: 'Please read the guidlines and check the checkboxes' });
					}}
				>
					Proceed
				</button>
			</div>
		);
	}
}

export default Submit;
