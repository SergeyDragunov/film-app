import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, initialize, reset, destroy } from 'redux-form';
import { Switch, Route } from 'react-router-dom';

import Modal from '../Modal/Modal';
import ModalNavTabs from '../ModalNavTabs/ModalNavTabs';

import { plural } from '../../utils';
import adjustFormData, { fetchCredits, fetchFilmography } from './adjustFormData';
import { setSettings } from '../../actions/contentModal';
import tabs from  './contentTabs.js';
import { API_URL, SEARCH_RESULTS } from '../../constants';
import './style.css';

const AbortController = window.AbortController;

const forms = {
  [SEARCH_RESULTS.FILMS]: 'newFilmForm',
  [SEARCH_RESULTS.TALENT]: 'newTalentForm',
  [SEARCH_RESULTS.FESTS]: 'newFestForm'
}

class AddContentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { change, match, reset, initialize, setSettings, userDraftContent } = this.props;
    const content = match.params.content;
    const formName = forms[content];

    this.controller = new AbortController();
    const signal = this.controller.signal;

    reset(formName);
    if (match.params.id && match.params.id !== "new" && !match.params.id.includes('draft')) {
      fetch(`${API_URL}/${content}/${match.params.id}`, {signal})
        .then(res => res.json())
        .then(data => {
          const values = adjustFormData(data);
          let promises = [];

          if (data.filmography && data.filmography.length) {
            promises.push({type: 'filmography', promise: fetchFilmography(data.filmography)});
          }

          if (data.credits && Object.keys(data.credits).length) {
            promises.push({type: 'credits', promise: fetchCredits(data.credits)});
          }

          Promise.all(promises.map(item => item.promise))
            .then(data => {
              promises.forEach((promise, i) => {
                values[promise.type] = data[i]
              });
              initialize(formName, values);
            })
            .catch(err => console.log(err));
        });
    } else if (match.params.id.includes('draft')) {
      const values = userDraftContent[plural(content)].filter(item => item.id === match.params.id)[0];
      for (let key in values) {
        change(formName, key, values[key]);
      }

    } else if (localStorage[formName]) {
      const values = JSON.parse(localStorage[formName]);
      for (let key in values) {
        change(formName, key, values[key]);
      }  
    }

    setSettings({id: match.params.id, formName});
    this.setState({isOpen: true});
  }

  componentDidUpdate() {
    const { match, form } = this.props;

    if (match.params.id && match.params.id === "new") {
      const content = match.params.content;
      const formName = forms[content];
      const formValues = form[formName] && form[formName].values ? form[formName].values : {};
    
      localStorage.setItem(formName, JSON.stringify(formValues));
    }
  }

  componentWillUnmount() {
    const { match, destroy } = this.props;
    const content = match.params.content;
    const formName = forms[content];
    destroy(formName);
  }

  closeModal() {    
    const { history, match } = this.props;
    this.setState({isOpen: false});
    history.push({pathname: `/user/content/${match.params.content}`, state: {noScroll: true}});
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { isOpen } = this.state;
    const { match } = this.props;

    return (
      <Modal 
        large
        isOpen={isOpen} 
        closeModal={this.closeModal}
        modalContentClass={'content-modal'}
      >
        <ModalNavTabs match={match} tabs={tabs[match.params.content]} />
        <Switch>
          {tabs[match.params.content].map((tab, key) => 
            <Route 
              exact={key === 0} 
              path={match.url + tab.path} 
              render={props => <tab.component id={match.params.id} {...props} />} 
              key={key} />
          )}
        </Switch>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    form: state.form || {},
    userDraftContent: state.user.data.data.unpublished
  }
};

export default connect(mapStateToProps, { change, initialize, reset, destroy, setSettings })(AddContentModal);