import { authConstants } from '../constants.js';

import { plural } from '../utils';

let user = JSON.parse(localStorage.getItem('user'));
let initState = {
	settings: {
		loggedIn: false,
		loggingIn: false,
		updating: false,
		error: ''
	},
	data: null 
}; 

if (user) {
	initState.settings.loggedIn = true;
	initState.data = {data: user};
}

const reducer = (state = initState, action) => {
	switch(action.type) {
		case authConstants.SAVE_UNPUBLISHED_SUCCESS:
		case authConstants.PATCH_USER_SUCCESS: {
			let settings = {...state.settings};
			let data = {...state.data};
			let user = {...data.data, ...action.data};

			settings.updating = false;
			settings.error = '';
			data.data = user;			

			localStorage.setItem('user', JSON.stringify(data));
			return {...state, settings, data};
		}
		case authConstants.SAVE_UNPUBLISHED_REQUEST:
		case authConstants.PATCH_USER_REQUEST:
		case authConstants.UPDATE_USER_REQUEST: {
			let settings = {...state.settings};

			settings.updating = true;
			settings.error = '';

			return {...state, settings};
		}
		case authConstants.UPDATE_USER_SUCCESS: {
			let settings = {...state.settings};
			let data = {...state.data};

			settings.updating = false;
			settings.error = '';
			data = action.user;
			
			return {...state, settings, data};
		}
		case authConstants.SAVE_UNPUBLISHED_FAILURE: 
		case authConstants.PATCH_USER_FAILURE: 
		case authConstants.UPDATE_USER_FAILURE: {
			let settings = {...state.settings};

			settings.error = action.error;
			settings.updating = false;

			return {...state, settings};
		}
		case authConstants.LOGIN_REQUEST: {
			let settings = {...state.settings};

			settings.loggingIn = true;
			settings.error = '';

			return {...state, settings};
		}
		case authConstants.LOGIN_SUCCESS: {
			let settings = {...state.settings};
			let data = {...state.data};
			settings.loggingIn = false;
			settings.loggedIn = true;
			settings.error = '';
			data = {data: action.user};

			return {...state, settings, data};
		}
		case authConstants.LOGIN_FAILURE: {
			let settings = {...state.settings};

			settings.loggingIn = false;
			settings.loggedIn = false;
			settings.error = action.error;

			return {...state, settings};
		}
		case authConstants.LOGOUT: {
			return {
				settings: {
					loggedIn: false,
					loggingIn: false,
					error: ''
				},
				data: null 
			};
		}
		case authConstants.ADD_CONTENT: {
			const data = {...state.data};
			const content = {...data.data.content};
			const id = action.payload.data.appID;
			content[plural(action.payload.content)] = [ ...content[plural(action.payload.content)], id];

			const user = {...state.data.data, content};
			data.data = user;

			localStorage.setItem('user', JSON.stringify(data));
			return {...state, data};
		}
		default: {
			return state;
		}
	}
}

export default reducer;