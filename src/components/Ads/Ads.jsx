import React from 'react';

import './style.css'

export const Ads = ({ children, width }) => (
	<div className={`ads ${width ? `ads--${width}` : ''}`}>
		{children}
	</div>
);