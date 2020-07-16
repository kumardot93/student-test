import Store from './redux/Store.js';
import { addToDataBuffer, newMessage } from './redux/actions/SocketState.js';
class VideoInput {
	// The width and height of the captured photo. We will set the
	// width to the value defined here, but the height will be
	// calculated based on the aspect ratio of the input stream.

	static width = 240; // We will scale the photo width to this
	static height = 0; // This will be computed based on the input stream

	// |streaming| indicates whether or not we're currently streaming
	// video from the camera. Obviously, we start at false.

	static streaming = false;

	// The various HTML elements we need to configure or control. These
	// will be set by the startup() function.
	static stream;
	static video = null;
	static canvas = null;
	static photo = null;
	static snapbutton = null;
	static readerAndSender = new FileReader();

	static initilize = () => {
		this.video = document.getElementById('video');
		this.canvas = document.getElementById('canvas');
		this.snapbutton = document.getElementById('snapbutton');
	};

	static deviceList = async () => {
		if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			alert('Browser not compatable. Upgrade to latest version of chrome.');
			return;
		}
		let videoDevices = [];
		await navigator.mediaDevices
			.enumerateDevices()
			.then((devices) =>
				devices.forEach((dev) => {
					if (dev.kind === 'videoinput') videoDevices = [ ...videoDevices, dev ];
				})
			)
			.catch(function(err) {
				console.log('An error occurred: ' + err);
			});
		return videoDevices;
	};

	static setVideoStream = (deviceId) => {
		this.video.style.display = 'block';
		navigator.mediaDevices
			.getUserMedia({ video: { deviceId }, audio: false })
			.then((stream) => {
				this.video.srcObject = stream;
				this.video.play();
			})
			.catch(function(err) {
				console.log('An error occurred: ' + err);
			});

		this.video.addEventListener(
			'canplay',
			(ev) => {
				if (!this.streaming) {
					this.height = this.video.videoHeight / (this.video.videoWidth / this.width);

					// Firefox currently has a bug where the height can't be read from
					// the video, so we will make assumptions if this happens.

					if (isNaN(this.height)) {
						this.height = this.width / (4 / 3);
					}

					this.video.setAttribute('width', this.width);
					this.video.setAttribute('height', this.height);
					this.canvas.setAttribute('width', this.width);
					this.canvas.setAttribute('height', this.height);
					this.streaming = true;
				}
			},
			false
		);
		this.readerAndSender.onload = (event) => {
			let data = event.target.result;
			let imageByteArray = new Uint8Array(data);
			let imageArrayData = Array.from(imageByteArray);
			let res = {
				type: 'ferimage',
				payload: {
					name: new Date().toLocaleTimeString().replace(/:/g, '-') + '.png',
					image: imageArrayData,
					question_number: Store.getState().Test.active + 1
				}
			};
			Store.dispatch(addToDataBuffer(JSON.stringify(res)));
			// this.props.addToDataBuffer(JSON.stringify(res));
		};
		Store.dispatch(newMessage({ code: 'DISPLAY', message: 'Video stream turned on' }));
	};

	static stopVideo = () => {
		let state = Store.getState().SocketState;
		if (state.snapsId) clearInterval(state.snapsId); //Stops sending image for fer at regular interval; sapsId is stored in Socket state which is id of set interval
		try {
			this.video.pause();
			this.video.srcObject.getTracks()[0].stop();
			Store.dispatch(newMessage({ code: 'DISPLAY', message: 'Video stream turned off' }));
		} catch (err) {}
		this.video.srcObject = null;
		this.video.style.display = 'none';
	};

	static takepicture = () => {
		let context = this.canvas.getContext('2d');
		if (this.width && this.height) {
			//checking if bot height and width are non zero
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			context.drawImage(this.video, 0, 0, this.width, this.height);

			// var data = canvas.toDataURL('image/png');
			// photo.setAttribute('src', data);
			return this.canvas;
		}
		return null;
	};
	static SendSnap = () => {
		this.canvas.toBlob((blob) => {
			this.readerAndSender.readAsArrayBuffer(blob);
		});
	};
}
export default VideoInput;
