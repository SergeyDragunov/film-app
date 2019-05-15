import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import createHistory from 'history/createBrowserHistory';

import { InputField } from '../ReduxFormField/ReduxFormField';
import Modal from '../Modal/Modal';

import './style.css';
import { login } from '../../actions/user';
 
const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const history = createHistory();

class LoginBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStatus: 'DEFAULT'
    }
  }

  componentDidUpdate(prevProps) {
    const { error, loading, success } = this.props;
    const { btnStatus } = this.state

    if (loading && btnStatus !== 'LOADING') this.setState({btnStatus: 'LOADING'});

    if (error && btnStatus !== 'ERROR' && btnStatus !== 'DEFAULT') {
      this.setState({btnStatus: 'ERROR'});
      setTimeout(() => this.setState({btnStatus: 'DEFAULT'}), 2000)
    }

    if (success && btnStatus !== 'SUCCESS') {
      this.setState({btnStatus: 'SUCCESS'});
    }
  }

  render() {
    const { btnStatus } = this.state;
    const { className } = this.props;

    const btnClass = 
      btnStatus === 'LOADING' ? "loading" :
      btnStatus ==='ERROR' ? "error" :
      btnStatus ==='SUCCESS' ? "success" 
      : '';
    const btnDisabled = btnStatus !== 'DEFAULT';

    return (
      <button 
        disabled={btnDisabled}
        className={`${className} ${btnClass}`}
        type="submit"
      >
        {!btnDisabled && this.props.children}
      </button>
    )
  }
}

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      remember: false
    }

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({isOpen: true});
  }

  componentDidUpdate() {
    const { user, location } = this.props;
    if (user.settings.loggedIn && !location.state.from) {
      setTimeout(() => history.goBack(), 1000)
    }
  }

  closeModal() {
    const { goBackPath } = this.props;
    this.setState({isOpen: false});

    goBackPath ? history.push(goBackPath) : history.goBack();
  }

  handleSubmit({ username, password }) {
    this.props.login(username, password);
  }

  render() {
    const { from: fromPath } = this.props.location.state || { from: { pathname: "/" } };
    const { isOpen } = this.state;
    const { handleSubmit } = this.props;
    const { settings } = this.props.user;
    const { error, loggingIn, loggedIn } = settings;

    if ( fromPath && loggedIn ) return <Redirect to={fromPath} />

    return (
     <Modal 
        modalContentClass="login-modal"
        isOpen={isOpen} 
        closeModal={this.closeModal} >
      <h3 className="modal__heading">Login</h3>
      {error && <p className="login-modal__error">{ error }</p>}
      <form onSubmit={handleSubmit(data => this.handleSubmit(data))}>
        <Field
          name="username"
          type="text"
          component={InputField}
          placeholder="Username"
          label="Username:"
          validate={required} />
        <Field
          name="password"
          type="password"
          component={InputField}
          placeholder="Password"
          label="Password:"
          validate={required} />
        <div className="login-modal__params">
          <div className="login-modal__remember">
            <input
              id="remember"
              type="checkbox" 
              name="remember"
              value="Remember me"
              className='sr-only' 
              checked={this.state.remember} 
              onChange={e => this.setState({remember: e.target.checked})}/>
              <label id='login-label-remember' htmlFor="remember">Remember me</label>
          </div>
          <a href="./">Forget password ?</a>
        </div>
        <LoginBtn 
          className="modal__btn login-modal__btn"
          loading={loggingIn}
          success={loggedIn}
          error={error}
          submit={handleSubmit}
        >
          Login
        </LoginBtn>
      </form>
      <div className="login-modal__social">
        <p className="login-modal__social-text">Or via social</p>
        <div className="login-modal__social-btn-wrapper">
          <a href="./" className="login-modal__social-btn login-modal__social-btn--facebook">
            <i className="icon ion-logo-facebook"></i>
            Facebook
          </a>
          <a href="./" className="login-modal__social-btn login-modal__social-btn--twitter">
            <i className="icon ion-logo-twitter"></i>
            twitter
          </a>
        </div>
      </div>
    </Modal>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {user};
}

const mapDispatchToProps = {
  login
}

LoginModal = reduxForm({
  form: 'login',
  initialValues: {
    username: 'test',
    password: 'test'
  }
})(LoginModal);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);