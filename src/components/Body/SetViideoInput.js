import React, { Component } from 'react';
import CloseOverlay from '../CloseOverlay.js';
import styles from './css/OverlayForm.module.css';
import VideoInput from './../../VideoSupport.js';

import { connect } from 'react-redux';

class SetVideoInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error_msg: null,
			video_devices: [],
			img_style: { backgroundColor: 'lightgrey', width: '240px', minHeight: '150px' },
			btnSpinner: { display: 'none' }
		};
		this.snap = null;
		VideoInput.initilize();
	}

	componentDidUpdate = () => {
		if (this.props.message.code == 'FER_READY') CloseOverlay(null, styles.overlaymain);
	};

	componentDidMount = () => {
		VideoInput.deviceList().then((dev) => {
			this.setState({ video_devices: dev });
		});
	};

	testVideoInput = (event) => {
		if (event.target.value === '') {
			VideoInput.stopVideo();
			return;
		}
		VideoInput.setVideoStream(event.target.value);
	};

	takeTestPicture = (event) => {
		let canvas = VideoInput.takepicture();
		if (!canvas) {
			this.setState({ error_msg: 'camaera has not opened' });
			setTimeout(() => this.setState({ error_msg: null }), 5000);
			return;
		}
		let data = canvas.toDataURL('image/png');
		this.snap.setAttribute('src', data);
	};

	startFER = (event) => {
		this.setState({ btnSpinner: {} });
		let res = { type: 'initilizeFER' };
		this.props.addToDataBuffer(JSON.stringify(res));
	};

	render() {
		console.log(this.props.message);
		let devices = this.state.video_devices.map((dev, index) => {
			return (
				<option key={index} value={dev.deviceId}>
					{dev.label === '' ? 'video ' + index : dev.label}
				</option>
			);
		});
		return (
			<div className="container bg-light" id={styles.overlaymain}>
				<button id={styles.cross} onClick={(event) => CloseOverlay(event, styles.overlaymain)}>
					<i className="material-icons">cancel</i>
				</button>
				<h1 className="text-center display-4">Expression Recognition Engine</h1>
				{this.state.error_msg == null ? (
					''
				) : (
					<label className="alert-danger form-control" style={{ width: '95%', height: 'auto' }}>
						{this.state.error_msg}
					</label>
				)}
				<h4 className="m-2 mt-4">Select a input device</h4>
				<select className="m-2" onChange={this.testVideoInput}>
					<option />
					{devices}
				</select>

				<img
					className="d-block m-auto"
					ref={(el) => (this.snap = el)}
					style={this.state.img_style}
					alt="The screen capture will appear in this box."
				/>
				<button className="material-icons d-block m-auto btn btn-primary" onClick={this.takeTestPicture}>
					camera_alt
				</button>
				<button className="btn btn-primary" onClick={this.startFER}>
					Start FER
					<span className="ml-1 spinner-border spinner-border-sm" style={this.state.btnSpinner} />
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.SocketState.message
	};
};

export default connect(mapStateToProps)(SetVideoInput);
