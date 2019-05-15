import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor'
import Slider from 'rc-slider';

import Modal from '../Modal/Modal';

import 'rc-slider/assets/index.css';
import './style.css';

class AvatarEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.avatar,
      scale: 1.2,
      error: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.removeAvatar = this.removeAvatar.bind(this);
  }

  handleInputChange(e) {
    const file = e.target.files[0];
    if(file) {
      if(file && (file.size / Math.pow(1024, 2) < 1)) {
        const imgURL =  window.URL.createObjectURL(file);
        this.setState({image: imgURL, error: ''});
      } else if (file.size / Math.pow(1024, 2) > 1) {
        this.setState({error: 'Maximum size for uploaded files 1Mb'});
      }
    }
  }

  onClickSave() {
    if (this.editor) {
      const { setAvatar, closeModal } = this.props;
      const avatar = this.editor.getImageScaledToCanvas().toDataURL();
      setAvatar(avatar);
      closeModal();
    }
  }

  removeAvatar() {
    const { setAvatar } = this.props;
    this.setState({image: ''})
    setAvatar('');
  }

  setEditorRef(editor) {
    this.editor = editor;
  }

  render() {
    const { image, scale, error } = this.state;
    const { isOpen, closeModal } = this.props;

    return (
      <Modal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        modalContentClass={'avatar-edit-modal'}>
        <h3 className="modal__heading modal__heading--avatar">Edit Avatar</h3>
        <div className="avatar-edit-modal__editor">
          {
            image && 
            <AvatarEditor
              ref={editor => this.setEditorRef(editor)} 
              image={image}
              width={200}
              height={200}
              border={10}
              color={[0, 0, 0, 0.5]}
              scale={scale}
              borderRadius={100}
            />
          }
        </div>
        {
          error && <p className='avatar-edit-modal__error'>{ error }</p>
        }
        <div className="avatar-edit-modal__change-btn">
          <input 
            id="avatarInput" 
            className='sr-only' 
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={this.handleInputChange} />
          <label htmlFor="avatarInput" className="redbtn">Upload Photo</label>
        </div>
        {
          image &&
          <div className="avatar-edit-modal__delete-btn-wrapper">
            <button className="avatar-edit-modal__delete-btn" onClick={this.removeAvatar}> Remove Current Avatar </button>
          </div>
        }
        {
          image &&
          <div className="avatar-edit-modal__slider-wrapper">
            <p className="avatar-edit-modal__slider-title">Scale</p>
            <Slider 
              min={1}
              max={3}
              step={0.01}
              value={scale}
              onChange={value => this.setState({scale: value})}
            />
          </div>
        }
        <div className="avatar-edit-modal__buttons">
          <div className="row">
            <div className="col-sm-6">
              <button onClick={this.onClickSave} className="modal__btn modal__btn--marginBottom" disabled={!image}>
                Save
              </button>
            </div>
            <div className="col-sm-6">
              <button className='modal__btn modal__btn--white' onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default AvatarEditModal;