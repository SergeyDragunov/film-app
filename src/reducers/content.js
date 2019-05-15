import { contentConstants } from '../constants.js';

let initState = {
	settings: {
		isFetching: false,
		isCreating: false,
		isUpdating: false,
		isUpdated: false,
		isDeleting: false,
		error: {
			getAllError: '',
			createError: ''
		}
	},
	data: null 
}; 

const reducer = (state = initState, action) => {
	switch(action.type) {
		case contentConstants.GET_ALL_REQUEST: {
			return {
				...state, 
				settings: {
					...state.settings,
					content: action.content,
					isFetching: true,
				},
				data: null
			};
		}
		case contentConstants.GET_ALL_SUCCESS: {
			return {
				...state, 
				settings: {
					...state.settings,
					isFetching: false
				},
				data: action.data
			};
		}
		case contentConstants.GET_ALL_FAILURE: {
			return {
				...state, 
				settings: {
					...state.settings,
					isFetching: false,
					error: {
						...state.error,
						getAllError: action.error
					}
				}
			};
		}
		case contentConstants.CREATE_REQUEST: {
			return {
				...state, 
				settings: {
					...state.settings,
					isCreating: true,
				}
			};
		}
		case contentConstants.CREATE_SUCCESS: {
			return {
				...state, 
				settings: {
					...state.settings,
					isCreating: false,
				}
			};
		}
		case contentConstants.CREATE_FAILURE: {
			return {
				...state, 
				settings: {
					...state.settings,
					isCreating: false,
					error: {
						...state.error,
						createError: action.error
					}
				}
			};
		}
		case contentConstants.UPDATE_REQUEST: {
			return {
				...state, 
				settings: {
					...state.settings,
					isUpdating: true,
					isUpdated: false,
				}
			};
		}
		case contentConstants.UPDATE_SUCCESS: {
			return {
				...state, 
				settings: {
					...state.settings,
					isUpdating: false,
					isUpdated: true,
				}
			};
		}
		case contentConstants.UPDATE_FAILURE: {
			return {
				...state, 
				settings: {
					...state.settings,
					isUpdating: false,
					isUpdated: false,
					error: {
						...state.error,
						createError: action.error
					}
				}
			};
		}
		case contentConstants.SET_UPDATED: {
			return {
				...state, 
				settings: {
					...state.settings,
					isUpdated: false
				}
			};
		}
		default: {
			return state;
		}
	}
}

export default reducer;
