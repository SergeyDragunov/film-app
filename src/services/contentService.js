import { API_URL } from '../constants.js';
import authHeader from '../utils/auth-header.js';
import { logout } from './userService';

const API = "https://api.themoviedb.org/3";
const API_KEY = "5874acfd11651a28c55771624f7021f4";
const apiRequest = (content, id) => `${API}/${content}/${id}?api_key=${API_KEY}&language=en-US`

const getAll = content => {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`${API_URL}/${content}`, requestOptions)
    .then(handleResponse)
    .then(data => data);
}

const getByID = (content, id) => {
  const requestOptions = {
    method: 'GET'
  };

  // return fetch(`${API_URL}/${content}/${id}`, requestOptions)
  return fetch(apiRequest(content, id), requestOptions)
    .then(handleResponse)
    .then(data => data);
}

const create = (content, body) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(`${API_URL}/${content}`, requestOptions)
    .then(handleResponse);
}

const update = (content, id, body) => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(`${API_URL}/${content}/${id}`, requestOptions)
    .then(handleResponse);
}

const _delete = (content, id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/${content}/${id}`, requestOptions)
    .then(handleResponse);
}

const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok || response.status === 204) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export default {
  getAll,
  getByID,
  update,
  create,
  delete: _delete
};