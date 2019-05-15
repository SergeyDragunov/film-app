import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { patchUser } from '../../actions/user';
import './style.css';

const soicalLinks = [
	['http://facebook.com','facebook'],
	['http://facebook.com','twitter'],
	['http://facebook.com','youtube']
];

class SocialButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip(state) {
    this.setState({isShown: state});
  }

  handleClick() {
    const { loggedIn, push, id, favorite, content, patchUser } = this.props;

    if (loggedIn) {
      const  patch = {
        type: 'follows',
        content,
        verb: !favorite ? 'add' : 'remove',
        id
      };

      patchUser(patch);
    }
    else push({
      pathname: '/login',
      state: {modal: true, noScroll: true}
    });
  }

  render() {
    const { favorite, updating } = this.props;
    const { isShown } = this.state;

    return (
      <div className="social-buttons-wrapper">
        <button className="social-button" onClick={this.handleClick} disabled={updating}>
          <i className={`icon ion-md-heart${favorite ? '-empty' : ''}`}></i> 
          {
            updating && favorite ?
            '...removing' : 
            updating && !favorite ?
            '...adding' :
            `${!favorite ? 'Add to' : 'Remove from'} Favorite`
          }
        </button>          

        <div 
          className="social-button-hover" 
          onMouseLeave={() => this.toggleTooltip(false)}>
          <button 
            className="social-button"
            onFocus={() => this.toggleTooltip(true)}
            onMouseEnter={() => this.toggleTooltip(true)}>
            <i className="icon ion-md-share"></i>share
          </button>
          <div className={`social-button-hover__body ${isShown ? 'active' : ''}`}>
            {soicalLinks.map((item, key) => (
              <a href={item[0]} className="hvr-grow" key={key}><i className={`icon ion-logo-${item[1]}`}></i></a>
            ))}
          </div>
        </div>    
      </div>
    ) 
  }
}

const mapStateToProps = ({ user }) => {
  return {
    updating: user.settings.updating,
    loggedIn: user.settings.loggedIn,
    user: user.data
  }
};

export default connect(mapStateToProps, { push, patchUser })(SocialButtons);