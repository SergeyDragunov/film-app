import { contentModalConstants } from '../constants';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case contentModalConstants.SET_SETTINGS: {
			return {
				...state,
				id: action.payload.id,
				formName: action.payload.formName
			};
		}
		default: {
			return state;
		}
	}
}

export default reducer;