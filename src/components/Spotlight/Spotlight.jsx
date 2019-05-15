import React from 'react';
import { Link } from 'react-router-dom';

import { SEARCH_RESULTS } from '../../constants.js'

const Spotlight = ({ data = [], contentType, link, heading, linkText }) => {
  return (
    <div className="celebrities">
      <h4 className="sb-title">{heading} Spotlight</h4>
      {
         data.map((item, key) => (
          <div className={`celeb-item celeb-item--${contentType}`} key={key}>
            <Link to={`/${link}`} tabIndex={-1}><img src={item.image} alt={item.name} /></Link>
            <div className="celeb-author">
              <h6><Link to={`/${link}`}>{item.name ? item.name : item.title}</Link></h6>
              {
                item.title ? <span>{item.title}</span> :
                item.date ? <span>{item.date}</span> :
                null
              }
            </div>
          </div>    
        ))
      }
      <Link 
      	to={`/${SEARCH_RESULTS.PAGE}/${contentType}`} 
      	className="btn">See all {linkText}
      		<i className="icon ion-ios-arrow-forward"></i>
      </Link>
    </div>
  )
}

export default Spotlight;