import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  setOpen() {
    this.setState({isOpen: !this.state.isOpen});
  }

  collapseNavbar() {
    if(window.innerWidth < 1024 && this.props.collapseNavbar) this.props.collapseNavbar();
  }

  render() {
    const { item } = this.props;
    const isOpen = this.state.isOpen ? 'open' : '';
    return (
      <li 
        className={"dropdown " + isOpen}
        onMouseEnter={() => window.innerWidth > 1024 ? this.setOpen() : null}
        onMouseLeave={() => window.innerWidth > 1024 ? this.setState({isOpen: false}) : null}
        onClick={() => this.setOpen()}>
        <a 
          href="./" 
          className="dropdown-toggle" 
          data-toggle="dropdown">
          {item.name} 
          <i className="icon ion-ios-arrow-forward"></i>
        </a>
        <ul className="dropdown-menu level2">
          {item.items.map((item, key) => {
            return <li key={key} onClick={() => this.collapseNavbar()}><a href={item[0]}>{item[1]}</a></li>
          })}
        </ul>
      </li>
    )
  }
}


class NavDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  setOpen(e) {
    if(e.target.classList.contains('lv1')) this.setState({isOpen: !this.state.isOpen});
  }

  collapseNavbar() {
    if(window.innerWidth < 1024 && this.props.collapseNavbar) this.props.collapseNavbar();
  }

  render() {
    const { item } = this.props;
    const isOpen = this.state.isOpen ? 'open' : '';
    
    return (
      <li 
        className={"dropdown first " + isOpen}
        onMouseEnter={(e) => window.innerWidth > 1024 ? this.setOpen(e) : null}
        onMouseLeave={() => this.setState({isOpen: false})}
        onClick={(e) => this.setOpen(e)}>
        <button
          className="btn btn-default dropdown-toggle lv1" 
          data-toggle="dropdown">
          {item.name} 
          <i className="icon ion-ios-arrow-down" aria-hidden="true"></i>
        </button>
        <ul className="dropdown-menu level1">
          {item.items.map((item, key) => {
            if(item instanceof Array) {
              return <li key={key} onClick={() => this.collapseNavbar()}><Link to={item[0]}>{item[1]}</Link></li>
            } else {
              return <SubDropdown item={item} key={key} collapseNavbar={this.props.collapseNavbar}/>;
            }
          })}
        </ul>
      </li>)
  }
}

export default NavDropdown;