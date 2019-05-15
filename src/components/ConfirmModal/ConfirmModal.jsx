import React, { Component } from 'react';

import Modal from '../Modal/Modal';

class ConfirmModal extends Component {
  handleSubmit(e) {
    e.preventDefault();

    this.props.submit()
  }

  render() {
    const { children, isOpen, closeModal } = this.props;

    return (
      <Modal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        modalContentClass={'confirm-modal'}>
        <h3 className="modal__heading">{children}</h3>
        <div>
          <div className="row">
            <div className="col-sm-6">
              <button onClick={e => this.handleSubmit(e)} className="modal__btn modal__btn--marginBottom">
                Yes
              </button>
            </div>
            <div className="col-sm-6">
              <button className='modal__btn modal__btn--white' onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ConfirmModal;