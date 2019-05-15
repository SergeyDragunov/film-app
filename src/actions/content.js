import { replace, push } from 'connected-react-router';
import { reset } from 'redux-form';

import { contentConstants, SEARCH_RESULTS } from '../constants.js';
import contentService from '../services/contentService.js';
import { addContent } from './user';

const forms = {
  [SEARCH_RESULTS.FILMS]: 'newFilmForm',
  [SEARCH_RESULTS.TALENT]: 'newTalentForm',
  [SEARCH_RESULTS.FESTS]: 'newFestForm'
}

/* Get All Content */

const getAll = content => {
	const request = content => ({ type: contentConstants.GET_ALL_REQUEST, content });
	const success = data => ({ type: contentConstants.GET_ALL_SUCCESS, data	});
	const failure = error => ({	type: contentConstants.GET_ALL_FAILURE, error	});

	return function(dispatch) {
		dispatch(request(content));

		contentService.getAll(content)
			.then(
				data => dispatch(success(data)),
				error => {
					dispatch(replace('/404'));
					dispatch(failure(error));
				}
			);
	}
};

/* Get By Id  Content*/

const getByID = (content, id) => {
	const request = () => ({ type: contentConstants.GET_BY_ID_REQUEST });
	const success = data => ({ type: contentConstants.GET_BY_ID_SUCCESS, data	});
	const failure = error => ({	type: contentConstants.GET_BY_ID_FAILURE, error	});

	return function(dispatch) {
		dispatch(request());

		contentService.getByID(content, id)
			.then(
				data => dispatch(success(data)),
				error => {
					dispatch(replace('/404'));
					dispatch(failure(error))
				}
			);
	}
};

/* Create Content */

const create = (content, body) => {
	const request = () => ({ type: contentConstants.CREATE_REQUEST });
	const success = () => ({ type: contentConstants.CREATE_SUCCESS });
	const failure = error => ({	type: contentConstants.CREATE_FAILURE, error });

	const formName = forms[content];

	return function(dispatch) {
		dispatch(request());

		contentService.create(content, body)
			.then(
				({ data }) => {
					localStorage.removeItem(formName);
					dispatch(reset(formName));
					dispatch(success());
					dispatch(addContent({content, data}))
					dispatch(push({
						pathname: `/user/content/${content}`, 
			      state: { noScroll: true }
					}));
				},
				error => {
					dispatch(failure(error));
					alert(error);
					console.log(error);
				}
			);
	}
};

/* Update Content */

const update = (content, id, body) => {
	const request = () => ({ type: contentConstants.UPDATE_REQUEST });
	const success = () => ({ type: contentConstants.UPDATE_SUCCESS });
	const failure = error => ({	type: contentConstants.UPDATE_FAILURE, error });

	return function(dispatch) {
		dispatch(request());

		contentService.update(content, id, body)
			.then(
				data => {
					dispatch(success());
					dispatch(push({
						pathname: `/user/content/${content}`, 
			      state: { noScroll: true }
					}));
				},
				error => dispatch(failure(error))
			);
	}
};

/* Set Updated */

const setUpdated = () => ({
	type: contentConstants.SET_UPDATED
})

/* Delet Content */

const _delete = (content, id) => {
	const request = () => ({ type: contentConstants.DELETE_REQUEST });
	const success = () => ({ type: contentConstants.DELETE_SUCCESS	});
	const failure = error => ({	type: contentConstants.DELETE_FAILURE, error });

	return function(dispatch) {
		dispatch(request());

		contentService.delete(content, id)
			.then(
				data => dispatch(success()),
				error => dispatch(failure(error))
			);
	}
};

export default {
	getAll,
	getByID,
	create,
	update,
	setUpdated,
	delete: _delete
}