import React from 'react';
import styles from './css/Notification.module.css';

function Notification(props) {
	return (
		<div className="ml-auto mr-4" style={{ opacity: '30%' }}>
			<button className="material-icons  btn" id={styles.notifBtn}>
				notifications
			</button>
		</div>
	);
}

export default Notification;
