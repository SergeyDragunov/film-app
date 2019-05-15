import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { isValid } from 'redux-form';

import { SEARCH_RESULTS } from '../../constants';

import './style.css';

const ModalNavTabs = ({ tabs, match, decrement, isValid }) => (
  <nav className='modal-nav-tabs'>
    {tabs.map((tab, key) => (
      <NavLink 
        className={!isValid && tab.path !== '/general' ? 'disabled' : ''}
        onClick={e => {if (!isValid && tab.path  !== '/general') e.preventDefault()}}
        to={{
          pathname: match.url + tab.path, 
          state: {
            modal: true,
            noScroll: true
          }
        }} 
        activeClassName="active" 
        key={key}
      >
        { tab.title }
      </NavLink>
    ))}
  </nav>
);

const mapStateToProps = state => {
  const { pathname } = state.router.location;
  let formName = '';

  if (pathname.includes(SEARCH_RESULTS.FILMS)) {
    formName = 'newFilmForm';
  } else if (pathname.includes(SEARCH_RESULTS.TALENT)) {
    formName = 'newTalentForm';
  } else if (pathname.includes(SEARCH_RESULTS.FESTS)) {
    formName = 'newFestForm';
  }

  return {
    isValid: isValid(formName)(state),
  }
};

export default connect(mapStateToProps, null)(ModalNavTabs);