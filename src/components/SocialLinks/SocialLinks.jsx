import React from 'react';

import { ReactComponent as WebsiteSVG } from '../../assets/images/icons/website--white.svg';
import { ReactComponent as ImdbSVG } from '../../assets/images/icons/imdb--white.svg';
import { ReactComponent as WikipediaSVG } from '../../assets/images/icons/wikipedia--white.svg';
import './style.css';

const socialLinks = [
	['http://facebook.com','facebook'],
	['http://facebook.com','twitter'],
	['http://facebook.com','youtube']
];

const shareLinks = [
  ['http://facebook.com','facebook'],
  ['http://facebook.com','twitter'],
  ['http://facebook.com','pinterest'],
  ['http://facebook.com','linkedin']
];

// const arr = [
//   ['http://facebook.com','website'],
//   ['http://facebook.com','imdb'],
//   ['http://facebook.com','facebook'],
//   ['http://facebook.com','twitter'],
//   ['http://facebook.com','tumblr'],
//   ['http://facebook.com','vimeo'],
//   ['http://facebook.com','youtube'],
//   ['http://facebook.com','instagram'],
//   ['http://facebook.com','wikipedia'],
//   ['http://facebook.com','email'],
//   ['http://facebook.com','linkedin'],
// ];

const svgs = {
  'website': <WebsiteSVG />,
  'imdb': <ImdbSVG />,
  'wikipedia': <WikipediaSVG /> 
}

export const SocialLinks = ({ textNeeded = true }) => (
  <div className="social-link">
    {textNeeded ? <p>Follow it: </p> : null}
    {socialLinks.map((link, key) => (
  		<a href={link[0]} key={key}>
        <span className="sr-only">{link[1]}</span>
        <i className={`icon ion-logo-${link[1]}`}></i>
      </a>
  	))}
  </div>
);


export const ShareLinks = ({ className }) => (
  <div className={`social-link ${className}`}>
    <h4>Share it</h4>
    {shareLinks.map((link, key) => (
      <a href={link[0]} key={key}>
        <span className="sr-only">{link[1]}</span>
        <i className={`icon ion-logo-${link[1]}`}></i>
      </a>
    ))}
  </div>
);

export const DetailSocialLinks = ({ socialLinks }) => (
  <div className="detail-social-links">
    {socialLinks.map((link, key) => (
      <a className="detail-social-link" target="_blank" rel="noopener noreferrer" href={link[0]} key={key}>
        {
          link[1] === 'website' ||
          link[1] === 'imdb' ||
          link[1] === 'wikipedia' ?
          <span className={`detail-social-link__icon  detail-social-link__icon--${link[1]}`}>{svgs[link[1]]}</span> :
          link[1] === 'email' ?
          <i className={`detail-social-link__icon icon icon--mail ion-md-mail`}></i> :
          <i className={`detail-social-link__icon icon icon--${link[1]} ion-logo-${link[1]}`}></i>
        }
        <span className="sr-only">{link[1]}</span>
      </a>
    ))}
  </div>
);