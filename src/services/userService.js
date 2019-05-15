import { API_URL } from '../constants.js';
import authHeader from '../utils/auth-header.js';

const users = [{
  id: 1,
  username: 'test',
  password: 'test',
  email: 'test@test.mail',
  firstName: 'Edward',
  lastName: 'Kennedy',
  country: {value: 'USA', label: 'United States of America'},
  state: {value: 'MD', label: 'Maryland'},
  favorites: {
    films: [
      'm0600001',
      'm0600020',
      'm0600076'
    ],
    talent: [
      't0600005',
      't0600010',
      't0600038',
    ],
    festivals: [
    ]
  }
}];

const pseudoFetch = (url, opts) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.endsWith('/login') && opts.method === 'POST') {
        // get parameters from post request
        let params = JSON.parse(opts.body);

        // find if any user matches login credentials
        let filteredUsers = users.filter(user => {
          return user.username === params.username && user.password === params.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return user details and fake jwt token
          let user = filteredUsers[0];
          let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token',
              email: user.email,
              favorites: user.favorites,
              country: user.country,
              state: user.state
          };
          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
        } else {
            // else return error
          reject('Username or password is incorrect');
        }

        return;
      }

      if (url.match(/\/users\/\d+$/) && opts.method === 'PUT') {
        if (opts.headers) {
          // find user by id in users array
          let urlParts = url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);

          for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
              users[i] = JSON.parse(opts.body);
              break;
            }
          }

          /* Only for development */
          let matchedUsers = users.filter(user => user.id === id);
          let user = matchedUsers.length ? matchedUsers[0] : null;
          // respond 200 OK with updated user
          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(user))});
        } else {
          // return 401 not authorised if token is null or invalid
          reject('Unauthorised');
        }
      }
    }, 500);
  });
}

const login = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return pseudoFetch(`${API_URL}/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

export const logout = () => localStorage.removeItem('user');

const update = user => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return pseudoFetch(`${API_URL}/users/${user.id}`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

const patch = ({ type, content, verb, id }) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { ...authHeader()},
  };

  return fetch(`${API_URL}/account/${type}/${content}/${verb}/${id}`, requestOptions)
    .then(handleResponse)
    .then(() => {
      return fetch(`${API_URL}/account/${type}`, {method: 'GET', headers: { ...authHeader()}})
                .then(handleResponse)
                .then(({data}) => data);
    });
}

const updateUnpublished = (content, body) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(`${API_URL}/account/unpublished/${content}`, requestOptions)
    .then(handleResponse)
    .then(() => {
      return fetch(`${API_URL}/account/unpublished`, {method: 'GET', headers: { ...authHeader()}})
                .then(handleResponse)
                .then(({data}) => data);
    });
}

export const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export default {
  login,
  logout,
  update,
  patch,
  updateUnpublished
};