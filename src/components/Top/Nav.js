import React from 'react';
import styles from './css/Top.module.css';

function Nav(props) {
	return (
		<div className="ml-4 pl-4" id={styles.navCont}>
			<a href="/" className={[ styles.navLink, 'ml-4 mr-4' ].join(' ')}>
				Home
			</a>
			<a href="#" className={[ styles.navLink, 'ml-4 mr-4' ].join(' ')} style={{ opacity: '30%' }}>
				Blog
			</a>
			<a href="#" className={[ styles.navLink, 'ml-4 mr-4' ].join(' ')} style={{ opacity: '30%' }}>
				Contact
			</a>
		</div>
	);
}

export default Nav;
