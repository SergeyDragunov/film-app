import React from 'react';

import logo from '../../assets/images/logo.png';

const Preloader = () => (
  <div id="preloader">
    <img className="logo" src={logo} alt="logo" />
    <div id="status">
      <span></span>
      <span></span>
    </div>
  </div>
);

export const ContentLoader = ({ style }) => (
	<div className="ContentLoader" style={style}>
		<div id="status">
	    <span></span>
	    <span></span>
	  </div>
	</div>
);

export default Preloader;