import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const UserHeader = ({ user, logout }) => (
	<div className="user-header">

		<div className="user-header__avatar">
			<Link to="/user/profile">
				{false ? <img src="" alt=""/> : <span>{user.firstName[0] + user.lastName[0]}</span>}
			</Link>
		</div>
		<div className="user-header__info">
			<p className="user-header__name"><Link to="/user/profile">{`${user.firstName[0]}. ${user.lastName}` }</Link></p>
			<button className="user-header__logout-btn" onClick={() => logout()}>Logout</button>
		</div>
	</div>
);

export default UserHeader;