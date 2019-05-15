import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
 
import NavDropdown from '../NavDropdown/NavDropdown';
import Logo from '../Logo/Logo';
import TopSearch from '../TopSearch/TopSearch';
import UserHeader from '../UserHeader/UserHeader';

import { logout } from '../../actions/user';
import menuItems from './menuItems';
import './style.css';

// const pageMenuItem = {
//   name: 'pages',
//   items: [
//     ["landing.html", "Landing"],
//     ["404.html", "404 Page"],
//     ["comingsoon.html", "Coming soon"]
//   ]
// };

const MenuItems = ({ collapseNavbar }) => {
  return menuItems.map((item, key) => {
    return <NavDropdown item={item} key={key} collapseNavbar={collapseNavbar}/>;
  });
}

const LogIn = () => (
  <ul className="nav navbar-nav flex-child-menu menu-right">
    {/*<NavDropdown 
      item={pageMenuItem}/>
    <li><a href="./">Help</a></li>*/}
    <li className="loginLink btn signupLink">
      <Link 
        to={{
          pathname: '/login',
          state: {modal: true, noScroll: true}
        }}>LOG In</Link>
    </li>
    {/*<li className="btn signupLink">
      <Link 
        to={{
            pathname: '/signup',
            state: {modal: true, noScroll: true}
          }}>sign up</Link>
    </li>*/}
  </ul>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSticky: false,
      isNavCollapsed: false,
      isSearchCollapsed: window.innerWidth > 992
    }

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.collapseNavbar = this.collapseNavbar.bind(this);
    this.collapseSearch = this.collapseSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos > 150 && !this.state.isSticky) this.setState({isSticky: true})
    else if (scrollPos <= 150 && this.state.isSticky) this.setState({isSticky: false})
  }

  onResize() {
    if (window.innerWidth > 991 && !this.state.isSearchCollapsed) {
      this.setState({isSearchCollapsed: true})
    } else if (window.innerWidth < 991 && this.state.isSearchCollapsed) {
      this.setState({isSearchCollapsed: false})
    }

    if (window.innerWidth > 991 && this.state.isNavCollapsed) {
      this.setState({isNavCollapsed: false})
    } 
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (window.innerWidth < 991 && location.pathname !== prevProps.location.pathname) {
      this.setState({isNavCollapsed: false});
    }

    if (this.state.isNavCollapsed) document.querySelector('body').classList.add('modal-open');
    else document.querySelector('body').classList.remove('modal-open');
  }

  handleClick(e) {
    e.stopPropagation();
    if (window.innerWidth < 991) {
      const target = e.target;
      const targetClassname = typeof target.className === 'string' ? target.className : '';
      if (targetClassname && targetClassname.includes('header--overlay')) {
        this.collapseNavbar(); 
      }
    }
  }

  collapseNavbar() {
    this.setState({
      isNavCollapsed: !this.state.isNavCollapsed,
      isSearchCollapsed: false
    });
  }

  collapseSearch() {
    this.setState({
      isSearchCollapsed: !this.state.isSearchCollapsed,
      isNavCollapsed: false
    });
  }

  render() {
    const { isNavCollapsed, isSticky } = this.state;
    const { loggedIn } = this.props.user.settings;
    const { data } = this.props.user;
    const user = data ? data.data : '';

    return (
      <header 
        className={`ht-header header ${isNavCollapsed ? 'header--overlay' : ''} ${isSticky ? 'sticky' : ''}`}
        onClick={e => this.handleClick(e)} >
        <div className="header__container">
          <div className="container">
            <nav className="navbar navbar-default navbar-custom">
              <div className="navbar-header">
                  <Logo />
                  <div 
                    className='header__toggle-search'
                    data-toggle="collapse" 
                    data-target="#search-collapse"
                    onClick={this.collapseSearch}>
                  </div>
                  <div 
                    className="navbar-toggle" 
                    data-toggle="collapse" 
                    data-target="#navbar-collapse" 
                    onClick={this.collapseNavbar}>
                      <span className="sr-only">Toggle navigation</span>
                      <div id="nav-icon1" className={this.state.isNavCollapsed ? 'open' : ''}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                  </div>
              </div>
              <Collapse 
                className={"navbar-collapse flex-parent "} 
                id="navbar-collapse" 
                aria-expanded={this.state.isNavCollapsed ? 'true' : 'false'}
                in={this.state.isNavCollapsed}>
                <div>
                  <ul className="nav navbar-nav flex-child-menu menu-left">
                    <li className="hidden">
                      <button href="#page-top"></button>
                    </li>
                    <MenuItems collapseNavbar={this.collapseNavbar}/>
                  </ul>
                  {
                    loggedIn ?
                    <UserHeader user={user} logout={this.props.logout} /> :
                    <LogIn />
                  }
                </div>
              </Collapse>
            </nav>
            <Collapse 
              id="search-collapse"
              aria-expanded={this.state.isSearchCollapsed ? 'true' : 'false'}
              in={this.state.isSearchCollapsed}>
              <div>
                <TopSearch />
              </div>
            </Collapse>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    location: state.router.location
  }
}

export default connect(mapStateToProps, { logout })(Header);