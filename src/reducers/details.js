import { contentConstants } from '../constants.js';

const initState = {
	settings: {
		isFetching: false,
		error: ''
	},
	data: {}
}

const reducer = (state = initState, action) => {
	switch(action.type) {
		case contentConstants.GET_BY_ID_REQUEST: {
			let settings = {...state.settings};
			let data = {...state.data};

			data = {};
			settings.isFetching = true;
			settings.error = '';

			return {...state, settings, data};
		}
		case contentConstants.GET_BY_ID_SUCCESS: {
			let settings = {...state.settings};
			let data = {...state.data};

			settings.isFetching = false;
			data = action.data;

			return {...state, settings, data};
		}
		case contentConstants.GET_BY_ID_FAILURE: {
			let settings = {...state.settings};

			settings.isFetching = false;
			settings.error = action.error;

			return {...state, settings};
		}
		default: {
			return state;
		}
	}
}

export default reducer;