import { authConstants } from '../constants.js';
import userService from '../services/userService.js';
import { reset } from 'redux-form';
import { push } from 'connected-react-router';

import { plural } from '../utils';

/* Login */

const requestLogin = () => ({
	type: authConstants.LOGIN_REQUEST
});

const successLogin = user => ({
	type: authConstants.LOGIN_SUCCESS,
	user
});

const failureLogin = error => ({
	type: authConstants.LOGIN_FAILURE,
	error
});

export const login = (username, password) => {
	return function(dispatch) {
		dispatch(requestLogin());

		userService.login(username, password)
			.then(
				user => {
					dispatch(successLogin(user));
				},
				error => {
					dispatch(failureLogin(error))
				}
			);
	}
};

export const logout = () => {
	userService.logout();
	return {type: authConstants.LOGOUT};
};

/* Update User */

const updateRequest = () => ({
	type: authConstants.UPDATE_USER_REQUEST
});

const updateSuccess = user => ({
	type: authConstants.UPDATE_USER_SUCCESS,
	user
});

const updateFailure = error => ({
	type: authConstants.UPDATE_USER_FAILURE,
	error
});

export const updateUser = user => {
	return function(dispatch) {
		dispatch(updateRequest());
		
		userService.update(user)
			.then(
				updatedUser => {
					dispatch(updateSuccess(updatedUser));
				},
				error => dispatch(updateFailure(error))
			);
	}
};

/* Patch User */

const patchRequest = () => ({
	type: authConstants.PATCH_USER_REQUEST
});

const patchSuccess = data => ({
	type: authConstants.PATCH_USER_SUCCESS,
	data
});

const patchFailure = error => ({
	type: authConstants.PATCH_USER_FAILURE,
	error
});

export const patchUser = (patch) => {
	return function(dispatch) {
		dispatch(patchRequest());
		
		userService.patch(patch)
			.then(
				data => {
					let ob = {};

					if (patch.type === 'follows') 
						ob.favorites = data;
					else 
						ob[patch.type] = data;
					
					dispatch(patchSuccess(ob));
				},
				error => dispatch(patchFailure(error))
			);
	}
};

/* Save Unpublished */

export const updateUnpublished = (content, body, formName) => {
	const request = () => ({ type: authConstants.SAVE_UNPUBLISHED_REQUEST });
	const success = data => ({ type: authConstants.SAVE_UNPUBLISHED_SUCCESS, data	});
	const failure = error => ({	type: authConstants.SAVE_UNPUBLISHED_FAILURE, error	});


	return function(dispatch) {
		dispatch(request());
		userService.updateUnpublished(plural(content), body)
			.then(
				data => {
					dispatch(success(data));
					localStorage.removeItem(formName);
					dispatch(reset(formName));
					dispatch(push({
						pathname: `/user/content/${content}`, 
			      state: { noScroll: true }
					}));
				},
				error => {
					dispatch(failure(error));
				}
			);
	}
};

/* Add Content */

export const addContent = payload => ({
	type: authConstants.ADD_CONTENT,
	payload
});

/* Sign Up */

// const requestSignUp = user => ({
// 	type: authConstants.SIGN_UP_REQUEST,
// 	user
// });

// const successSignUp = user => ({
// 	type: authConstants.SIGN_UP_SUCCESS,
// 	data
// });

// const failureSignUp = error => ({
// 	type: authConstants.SIGN_UP_FAILURE,
// 	error
// });

// export const signUp = () => {
// 	return function(dispatch) {
// 		dispatch(requestSignUp(user));

// 		setTimeout(() => {
// 			dispatch(successSignUp(user));
// 		}, 1000);
// 	}
// };