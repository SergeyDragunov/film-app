import React from 'react';
import { Link } from 'react-router-dom';

const TabHeading = ({ heading, children, count, link, icon }) => (
	<div className="title-hd-sm">
		<h4 className={icon}>{heading}{count ? <span>{` (${count})`}</span> : null}</h4>
		{(children && link) && <Link to={link} className="time"> {children} <i className="icon ion-ios-arrow-forward"></i></Link>}
	</div>
);

export default TabHeading;