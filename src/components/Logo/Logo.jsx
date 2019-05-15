import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './style.css'

const Logo = ({ className }) => (
	<Link to="/" className={"logo " + (className || '')}>
		<img src={logo} alt="logo" />
	</Link>
)

export default Logo;