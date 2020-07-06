import React from 'react';
import ReactDOM from 'react-dom';

function Message(props) {
	setTimeout(() => {
		let el = document.getElementById('message');
		ReactDOM.unmountComponentAtNode(el);
		el.style.display = 'none';
	}, 10000);
	return <React.Fragment>{props.message}</React.Fragment>;
}

export default Message;
