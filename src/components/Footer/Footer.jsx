import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import navLinks from './navLinks';

import { SocialLinks } from '../SocialLinks/SocialLinks';
import Logo from '../Logo/Logo';

import './style.css';

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  render() {
    return (
      <div>
        <h4>Mail List</h4>
        <p>Subscribe to our mail list system now <br/> to get latest news from us.</p>
        <form>
          <label htmlFor="email" className="sr-only">Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="Enter your email..." 
            value={this.state.emai}
            onChange={(e) => this.setState({email: e.target.value})} />
        </form>
        <a href="./" className="btn">Subscribe now <i className="icon ion-ios-arrow-forward"></i></a>
      </div>
    )
  }
}

const NavLinksList = () => (
  navLinks.map((navLinks, key) => (
    <div className="flex-child-ft item2 col-sm-2" key={key}>
      <h4>{navLinks.title}</h4>
      <ul>
        {navLinks.links.map((link, key) => <li key={key}><Link to={link[0]}>{link[1]}</Link></li>)}
      </ul>
    </div>
  ))
);

class Footer extends Component {
  render() {
    return (
      <footer className="ht-footer">
        <div className="container">
          <div className="flex-parent-ft row">
            <div className="flex-child-ft item1 col-sm-2">
              <Logo />
              <address>
                <p>3537 36th Street<br/>
                Astoria, NY 11106</p>
              </address>
              <SocialLinks textNeeded={false}/>
            </div>
            <NavLinksList />
            <div className="flex-child-ft item5 col-sm-3 col-md-offset-2">
              <Newsletter />
            </div>
          </div>
        </div>
        <div className="ft-copyright">
          <div className="ft-left">
            <p>© 2018 RISE. All Rights Reserved.</p>
          </div>
          <div className="backtotop">
            <p>
              <button 
                className="footer__back-top-btn" 
                id="back-to-top"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                Back to top  <i className="icon ion-md-arrow-up"></i>
              </button>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;