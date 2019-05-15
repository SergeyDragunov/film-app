import React from 'react';

import './style.css'

const DetailsMainImage = ({ image, title, className, favorite }) => (
	<div className={"details-main-image " + (className || '') + (favorite ? " details-main-image--favorite" : '')}>
		{favorite && <span className="details-main-image__tag"><i className="icon ion-md-heart"></i></span>}
		{image && <img src={image} alt={title} />}
	</div>
)

export default DetailsMainImage;