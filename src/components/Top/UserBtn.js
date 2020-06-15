import React, { useState } from 'react';
import styles from './css/UserBtn.module.css';

import { connect } from 'react-redux';

function UserBtn(props) {
	const [ userPannelVis, changeVis ] = useState('none');
	return (
		<div className="ml-2" id={styles.userBtnCont}>
			<button
				className="p-0"
				id={styles.userBtn}
				onClick={(ev) => changeVis(userPannelVis === 'block' ? 'none' : 'block')}
				onBlur={(ev) => setTimeout(changeVis, 10, 'none')}
			>
				<img
					src={props.profile.name !== undefined ? window.media_url + props.profile.fields.profile_pic : ''}
					id={styles.userBtnImg}
					alt=""
				/>
			</button>
			<div
				onClick={(ev) => setTimeout(changeVis, 20, 'block')}
				id={styles.userPannel}
				className="p-2 pr-3 bg-white"
				style={{ display: userPannelVis }}
			>
				{props.profile.name !== undefined ? (
					<React.Fragment>
						<span className={styles.userData}>{props.profile.username}</span>
						<span className={[ styles.userData, 'text-secondary' ].join(' ')}>{props.profile.email}</span>
					</React.Fragment>
				) : (
					''
				)}
				<hr className="m-0 mt-1" />
				<a
					href="#"
					className={[ styles.navLink, styles.userPannelLink, 'pb-0 mt-2 mb-1 mr-2 ml-1' ].join(' ')}
					style={{ opacity: '30%' }}
				>
					Profile
				</a>
				<a
					href={window.base + '/user/logout/'}
					className={[ styles.navLink, styles.userPannelLink, 'pb-0 mb-0 mr-2 ml-1' ].join(' ')}
				>
					Logout
				</a>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		profile: state.Profile
	};
};

export default connect(mapStateToProps)(UserBtn);
