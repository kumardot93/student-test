import React, { Component } from 'react';
import CloseOverlay from '../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';

class Submit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error_msg: 'Conform Test Submittion',
			btnSpinner: { display: 'none' }
		};
	}

	render() {
		return (
			<div className="container bg-light" id={styles.overlaymain}>
				<button id={styles.cross} onClick={(event) => CloseOverlay(event, styles.overlaymain)}>
					<i className="material-icons">cancel</i>
				</button>
				<h1 className="text-center display-4">Submit Test</h1>

				<label className="alert-danger form-control" style={{ width: '95%', height: 'auto' }}>
					{this.state.error_msg}
				</label>

				<p>Once submitted you will not be able to modify the any changes</p>

				<button
					className="btn btn-primary"
					onClick={(event) => {
						this.props.sendResult();
						CloseOverlay(event, styles.overlaymain);
					}}
				>
					Submit
					<span className="ml-1 spinner-border spinner-border-sm" style={this.state.btnSpinner} />
				</button>
			</div>
		);
	}
}

export default Submit;
