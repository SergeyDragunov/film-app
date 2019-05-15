import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './style.css';

class NoMatch extends Component {
	componentDidMount() {
		this.props.toggleMatch();
	}

	componentWillUnmount() {
		this.props.toggleMatch();
	}

	render() {
		return (
			<div className="noMatch">
				<div>
					<Logo className="noMatch__logo" />
					<h1 className="noMatch__heading">404</h1>
					<h2 className="noMatch__sub-heading">Page not found</h2>
					<Link to="/" className="noMatch__btn redbtn redbtn--b-radius">go home</Link>
				</div>
			</div>
		);
	}
}


export default NoMatch;