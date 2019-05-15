import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';

import Modal from '../Modal/Modal';
 
const history = createHistory();

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isOpen: true});
    }, 5);
  }

  closeModal() {    
    this.setState({isOpen: false});
    history.goBack();
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = `name: ${this.state.name}\npassword: ${this.state.password}\nemail: ${this.state.email}\nre-pass: ${this.state.rePassword}`;
    alert(data);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Modal 
        isOpen={isOpen} 
        className="signup-modal"
        closeModal={this.closeModal} >
        <h3 className="modal__heading">sign up</h3>
        <form  action="#">
          <div className="row">
            <div className="form-group">
              <label htmlFor="username-2">Username:</label>
              <input 
                type="text" 
                name="username" 
                id="username-2" 
                placeholder="Hugh Jackman" 
                pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$" 
                required="required" 
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="email-2">your email:</label>
              <input 
                type="password" 
                name="email" 
                id="email-2" 
                placeholder="" 
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                required="required" 
                value={this.state.email}
                onChange={e => this.setState({email: e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="password-2">Password:</label>
              <input 
                type="password" 
                name="password" 
                id="password-2" 
                placeholder="" 
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                required="required" 
                value={this.state.password}
                onChange={e => this.setState({password: e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="repassword-2">re-type Password:</label>
              <input 
                type="password" 
                name="password" 
                id="repassword-2" 
                placeholder="" 
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                required="required" 
                value={this.state.rePassword}
                onChange={e => this.setState({rePassword: e.target.value})}/>
            </div>
          </div>

          <div className="row">
            <button 
              className="modal__btn"
              type="submit"
              onClick={e => this.handleSubmit(e)}>sign up</button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default SignUpModal;