import React from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';

import { SEARCH_RESULTS } from '../../constants';

import './style.css';

// const categoriesColors = {
//   'SPOTLIGHT': 'orange',
//   'TALENT': 'green',
//   'FILM': 'blue',
//   'FESTIVAL': 'green'
// };

const categoriesColors = {
  'SCI-FI': 'orange',
  'DRAMA': 'green',
  'COMEDY': 'blue',
  'DOCUMENTARY': 'green'
};

const toLowerCase = str => str ? str.toLowerCase() : '';

const setCategoryColor = (cat) => {
  const categories = Object.keys(categoriesColors);
  for(let i = 0; i < categories.length; i++) {
    if(cat === categories[i]) {
      return categoriesColors[categories[i]];
    }
  }
} 

const setLink = link => {
  const content = link.split('/')[1];

  if (content === 'spotlight') {
    return `/${content}`;
  } else {
    return `/${SEARCH_RESULTS.PAGE}/${content}`;
  }
}

const TagCategory = ({ cat, link }) => {
  if (cat)
    return (
      <div className="cate">
        <span className={setCategoryColor(cat)}>
          <Link 
            to={setLink(link)}>
            { cat }
          </Link>
        </span> 
      </div>
    )
  else 
    return null
}

export const ReadMoreOverlay = ({ link }) => (
  <div className="read-more-overlay">
    <Link 
      to={link} 
      tabIndex={-1}
      className="redbtn read-more-overlay__btn"
    > 
      Read more <i className="icon ion-ios-arrow-forward"></i> 
    </Link>
  </div>
)

export default ({ data, small, link , className}) => (
  <div className={"media-item " + className} key={data.id}>
    <div className="media-item__image">
      <Link to={link} tabIndex={-1}>
        {data.image && <img src={data.image} alt={data.title || data.name} />}
      </Link>
    </div>
    { small && <ReadMoreOverlay link={link} /> }
    <div className="media-item__content">
      { !small && <TagCategory cat={data.category} link={link} /> }
      {
        (data.title || data.name) &&
        <h6 className="media-item__title">
          <Link to={link}>
            <LinesEllipsis 
              text={data.title ? data.title.toUpperCase() : data.name.toUpperCase()} 
              component='span' 
              maxLine={2} />
          </Link>
        </h6>
      }
      {
        small &&
        <p className="media-item__param">
	       	{ toLowerCase(data.category) }
        </p>
      }
    </div>
  </div>
)