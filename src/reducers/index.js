import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import details from './details';
import user from './user';
import content from './content';
import contentModal from './contentModal';

export default combineReducers({
	content,
	details,
	user,
	contentModal,
	form: formReducer
});