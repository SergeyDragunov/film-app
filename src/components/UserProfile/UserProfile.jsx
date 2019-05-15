import React from 'react';

import UserProfileDetails from '../UserProfileDetails/UserProfileDetails';
import UserChangePass from '../UserChangePass/UserChangePass';

const UserProfile = () => (
	<div id="userProfile" className="form-style-1 user-pro">
		<UserProfileDetails />
		<UserChangePass />
	</div>
)

export default UserProfile;