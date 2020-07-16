import ReactDOM from 'react-dom';
import styles from './Body/css/OverlayForm.module.css';

var CloseOverlay = (event, elid) => {
	//function to close any activity with overlay
	if (event) event.preventDefault();

	//appliying animation by changing styles id of the element
	document.getElementById(elid).id = styles.unmount;
	setTimeout(unmount, 350); //timeout function, callback called after animation
};

//funtion to unmount any component in overlay div
var unmount = () => {
	ReactDOM.unmountComponentAtNode(document.getElementById('overlay'));
	document.getElementById('overlay').style.display = 'none';
};

export default CloseOverlay;
