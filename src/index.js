import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './redux/Store.js';
import { Provider } from 'react-redux';
import SocketManager from './SocketManager.js';

window.base = 'http://localhost:8000';
window.hostName = 'localhost:8000';
window.media_url = window.base + '/media/';
// window.media_url = 'https://eduhub.blob.core.windows.net/eduhub/';
window.cred = 'include';

ReactDOM.render(
	<Provider store={Store}>
		<App />
		<SocketManager />
	</Provider>,
	document.getElementById('root')
);

// var ws = new WebSocket('ws://' + window.host + '/ws/material/testMaker/');
// export { ws };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

var takepicture;

(function() {
	// The width and height of the captured photo. We will set the
	// width to the value defined here, but the height will be
	// calculated based on the aspect ratio of the input stream.

	var width = 320; // We will scale the photo width to this
	var height = 0; // This will be computed based on the input stream

	// |streaming| indicates whether or not we're currently streaming
	// video from the camera. Obviously, we start at false.

	var streaming = false;

	// The various HTML elements we need to configure or control. These
	// will be set by the startup() function.

	var video = null;
	var canvas = null;
	var photo = null;
	var snapbutton = null;

	function startup() {
		video = document.getElementById('video');
		canvas = document.getElementById('canvas');
		photo = document.getElementById('photo');
		snapbutton = document.getElementById('snapbutton');

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then(function(stream) {
				video.srcObject = stream;
				video.play();
			})
			.catch(function(err) {
				console.log('An error occurred: ' + err);
			});

		video.addEventListener(
			'canplay',
			function(ev) {
				if (!streaming) {
					height = video.videoHeight / (video.videoWidth / width);

					// Firefox currently has a bug where the height can't be read from
					// the video, so we will make assumptions if this happens.

					if (isNaN(height)) {
						height = width / (4 / 3);
					}

					video.setAttribute('width', width);
					video.setAttribute('height', height);
					canvas.setAttribute('width', width);
					canvas.setAttribute('height', height);
					streaming = true;
				}
			},
			false
		);

		snapbutton.addEventListener(
			'click',
			function(ev) {
				takepicture();
				ev.preventDefault();
			},
			false
		);

		clearphoto();
	}

	// Fill the photo with an indication that none has been
	// captured.

	function clearphoto() {
		var context = canvas.getContext('2d');
		context.fillStyle = '#AAA';
		context.fillRect(0, 0, canvas.width, canvas.height);

		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	// Capture a photo by fetching the current contents of the video
	// and drawing it into a canvas, then converting that to a PNG
	// format data URL. By drawing it on an offscreen canvas and then
	// drawing that to the screen, we can change its size and/or apply
	// other changes before drawing it.

	takepicture = () => {
		var context = canvas.getContext('2d');
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			context.drawImage(video, 0, 0, width, height);

			var data = canvas.toDataURL('image/png');
			photo.setAttribute('src', data);

			/*for (var value of form_data.values()) {
     console.log(value); 
  }*/

			/*---     canvas.toBlob(function(blob){
            var form_data = new FormData();
        form_data.append('name','Aditya');
        form_data.append('question_no','4');
          
          form_data.append('img',blob,'a.png');
  
          //console.log(form_data);
  
          for (var value of form_data.values()) {
     console.log(value); 
  }
  fetch('http://localhost:8000/saveImg',{
          method : 'POST',
          mode: 'no-cors',
          body : form_data,
        })      
  
  
          
        })        ----*/

			/* fetch('http://localhost:8000/temp',{
          method : 'POST',
          body : form_data,
        })*/
		} else {
			clearphoto();
		}
		return context.getImageData(0, 0, width, height);
	};

	// Set up our event listener to run the startup process
	// once loading is complete.
	window.addEventListener('load', startup, false);
})();

export { takepicture };
