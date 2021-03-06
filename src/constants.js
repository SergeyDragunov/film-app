
/* Redux: Detail pages */

const DETAIL_FETCH_DATA = 'DETAIL_FETCH_DATA',
			DETAIL_REQUEST_DATA = 'DETAIL_REQUEST_DATA',
			DETAIL_RECIEVE_DATA = 'DETAIL_RECIEVE_DATA';

/* Redux: User */

const USER_FETCH_DATA = 'USER_FETCH_DATA',
			USER_REQUEST_DATA = 'USER_REQUEST_DATA',
			USER_RECIEVE_DATA = 'USER_RECIEVE_DATA';

/* Redux: User */

const authConstants = {
  LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

  SIGN_UP_REQUEST: 'USER_SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'USER_SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'USER_SIGN_UP_FAILURE',

  LOGOUT: 'USER_LOGOUT',

  UPDATE_USER_REQUEST: 'USER_UPDATE_REQUEST',
  UPDATE_USER_SUCCESS: 'USER_UPDATE_SUCCESS',
  UPDATE_USER_FAILURE: 'USER_UPDATE_FAILURE',

  PATCH_USER_REQUEST: 'USER_PATCH_REQUEST',
  PATCH_USER_SUCCESS: 'USER_PATCH_SUCCESS',
  PATCH_USER_FAILURE: 'USER_PATCH_FAILURE',

  SAVE_UNPUBLISHED_REQUEST: 'USER_SAVE_UNPUBLISHED_REQUEST',
  SAVE_UNPUBLISHED_SUCCESS: 'USER_SAVE_UNPUBLISHED_SUCCESS',
  SAVE_UNPUBLISHED_FAILURE: 'USER_SAVE_UNPUBLISHED_FAILURE',

  ADD_CONTENT: 'USER_ADD_CONTENT'
};

/* Redux: Content */

const contentConstants = {
  GET_ALL_REQUEST: 'CONTENT_GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'CONTENT_GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'CONTENT_GET_ALL_FAILURE',

  GET_BY_ID_REQUEST: 'CONTENT_GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS: 'CONTENT_GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE: 'CONTENT_GET_BY_ID_FAILURE',

  CREATE_REQUEST: 'CONTENT_CREATE_REQUEST',
  CREATE_SUCCESS: 'CONTENT_CREATE_SUCCESS',
  CREATE_FAILURE: 'CONTENT_CREATE_FAILURE',

  UPDATE_REQUEST: 'CONTENT_UPDATE_REQUEST',
  UPDATE_SUCCESS: 'CONTENT_UPDATE_SUCCESS',
  UPDATE_FAILURE: 'CONTENT_UPDATE_FAILURE',

  DELETE_REQUEST: 'CONTENT_DELETE_REQUEST',
  DELETE_SUCCESS: 'CONTENT_DELETE_SUCCESS',
  DELETE_FAILURE: 'CONTENT_DELETE_FAILURE',

  SET_UPDATED: 'CONTENT_SET_UPDATED'
};

const contentModalConstants = {
	SET_SETTINGS: 'CONTENT_MODAL_SET_SETTINGS'
}


/* Search Routes (Warning: in some components it is also visual content. E.g. In SearchForm, Spotlight for heading) */

const SEARCH_RESULTS = {
	PAGE: 'searchresults',
	FILMS: 'film',
	TALENT: 'talent',
	FESTS: 'festival',
	NEWS: 'news'
};

/* Single Page Routes */

const SINGLE_PAGE = {
	FILM: 'film',
	TALENT: 'talent',
	FEST: 'festival',
	NEWS: 'news'
};			

/* Load Duration After Fade Effect  */

const AFTER_FADE_DURATION = 300;

/* API */

const API_URL = 'http://api.nmdb.io/api/v1.0';

export {
	API_URL,
	SEARCH_RESULTS,
	SINGLE_PAGE,
	AFTER_FADE_DURATION,
	DETAIL_FETCH_DATA,
	DETAIL_REQUEST_DATA,
	DETAIL_RECIEVE_DATA,
	USER_FETCH_DATA,
	USER_REQUEST_DATA,
	USER_RECIEVE_DATA,
	authConstants,
	contentConstants,
	contentModalConstants
}