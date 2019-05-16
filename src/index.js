import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

/* Styles */

import './assets/lib/slick/slick.css'
import './assets/lib/slick/slick-theme.css'
import './assets/lib/ionicons/css/ionicons.min.css'
import './assets/css/style.css';
import './assets/css/custom.css';

import App from './containers/App/App';

/* Polyfills */

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunkMiddleware
    ),
  ),
);

ReactDOM.render(
  <Provider store={store}>
  	<ConnectedRouter history={history}>
		  <Router history={history} basename={process.env.PUBLIC_URL}>
		    <Route component={App} /> 
		  </Router>
	  </ConnectedRouter>
	 </Provider>,
  document.getElementById('root'));