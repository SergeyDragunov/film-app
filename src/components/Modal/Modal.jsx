import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

import './style.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }

    this.overlayClose = this.overlayClose.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (this.props.closeModal) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  componentDidUpdate() {
    const { isOpen } = this.props;
    if (isOpen && !this.state.mounted) {
      setTimeout(() => 
        this.setState({mounted: true}, () => {
          if (this.closeButton) this.closeButton.focus();
        })
      , 100)
    };

    if (isOpen) document.querySelector('body').classList.add('modal-open');
    else if (!isOpen) document.querySelector('body').classList.remove('modal-open');
  }

  componentWillUnmount() {
    if (this.props.closeModal) {
      window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  handleClose() {
    this.props.closeModal();
    this.setState({mounted: false});
  }

  listenKeyboard(event) {
    if ((event.key === 'Escape' || event.keyCode === 27) && this.props.isOpen) {
      this.handleClose();
    }
  }

  overlayClose(e) {
    e.stopPropagation();
    const target = e.target;
    const targetClassname = typeof target.className === 'string' ? target.className : '';
    if (targetClassname && targetClassname.includes('modal--open')) {
      this.handleClose(); 
    }
  }

  render() {
    const { mounted } = this.state;
    const { isOpen, children, modalContentClass, large } = this.props;
    
    if (isOpen) {
      return ReactDOM.createPortal (
        <FocusTrap>
          <div 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby={modalContentClass || 'modal'} 
            aria-hidden={!isOpen}
            className={`modal ${mounted ? 'modal--open' : ''}`} 
            onClick={e => this.overlayClose(e)}>
            <div className={`modal__dialog ${large ? 'modal__dialog--large' : ''}`}>
              <div className={`modal__content ${modalContentClass ? modalContentClass : ''}`}>
                <button 
                  ref={ref => this.closeButton = ref}
                  id="closeModal" 
                  aria-label="Close Modal"
                  className="modal__close" 
                  onClick={this.handleClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" width="512" height="512">
                    <path d="M131.804 106.491l75.936-75.936c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.491 81.18 30.554 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.989 6.99-6.989 18.323 0 25.312l75.937 75.936-75.937 75.937c-6.989 6.99-6.989 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0l75.937-75.937 75.937 75.937c6.989 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.322 0-25.312l-75.936-75.936z" fill="#FFF" fillRule="evenodd" clipRule="evenodd"/>
                  </svg> 
                  <span className="sr-only">(close)</span>
                </button>
                {children}
              </div>
            </div>
          </div>
        </FocusTrap>,
      document.body );
    } else return null;
  }
}

export default Modal;