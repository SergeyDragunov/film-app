import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import { SINGLE_PAGE, API_URL, SEARCH_RESULTS } from '../../constants';
import { ContentControl } from '../ContentControls/ContentControls';
import { ReadMoreOverlay } from '../MediaItem/MediaItem';

import { intersperse } from '../../utils';
import './style.css'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const AbortController = window.AbortController;

export const Fest = ({ fest, controls, removeHandler }) => (
  <div className="film">
    <div className="film__poster">
      <Link to={`/${SINGLE_PAGE.FEST}/${fest.id}`} tabIndex={-1}>
        {fest.image && <img src={fest.image} alt={fest.title} />}
      </Link>
      {
        controls && 
        <ContentControl
          content={SEARCH_RESULTS.FILMS} 
          id={fest.id} 
          edit={controls.edit}
          remove={controls.remove}
          removeHandler={removeHandler} 
          className="content-control--film" />
      }
    </div>
    <div className="film__info-wrapper">
      <h6 className="film__title">
        <Link to={`/${SINGLE_PAGE.FEST}/${fest.id}`}>{fest.title}</Link>
      </h6>
      {
        fest.description && 
        <ResponsiveEllipsis 
          text={fest.description} 
          component='p' 
          className="film__description" 
          maxLine={2} />}
      {
        fest.dates && 
        <div className="film__param">
          <span className="film__param-title">Dates: </span> 
          <span className="film__param-data">
            {fest.dates}
          </span>
        </div>
      }
      <div className="film__param">
        <span className="film__param-title">Country:</span>
        <span className="film__param-data film__param-data--noCap">
          {fest.country.name}
        </span>
      </div>
      <div className="film__param">
        <span className="film__param-title">Accredited By:</span>
        <span className="film__param-data film__param-data--noCap">
          {!!fest.accredited.length && intersperse(fest.accredited.map(accr => accr), ' and ')}
        </span>
      </div>
      <div className="film__param">
        <span className="film__param-title">Categories:</span>
        <span className="film__param-data">
          {intersperse(fest.category.map(cat => cat), ', ')}
        </span>
      </div>
      {
        fest.website &&
        <div className="film__param">
          <span className="film__param-title">Website:</span>
          <span className="film__param-data film__param-data--noCap">
            <a href={fest.website} target="_blank" rel="noopener noreferrer">{fest.website}</a>
          </span>
        </div>
      }
    </div>
  </div>
);

export const FestGrid = ({ fest, controls, removeHandler, draft }) => (
  <div className={`film-grid ${draft ? 'film-grid--draft' : ''}`}>
    <div className="film-grid__main">
      <div className="film-grid__poster">
        {
          fest.image && 
          <Link
            tabIndex={-1}
            to={`/${SINGLE_PAGE.FEST}/${fest.id}`}>
            <img src={fest.image} alt={fest.title} />
          </Link>
        }
      </div>
      {
        controls && 
        <ContentControl 
          content={SEARCH_RESULTS.FESTS} 
          id={fest.id}
          award={controls.award} 
          edit={controls.edit}
          remove={controls.remove}
          removeHandler={removeHandler} 
          className="content-control--film" />
      }
      <ReadMoreOverlay link={`/${SINGLE_PAGE.FEST}/${fest.id}`} />
    </div>
    <h6 className="film-grid__title">
      <Link to={`/${SINGLE_PAGE.FEST}/${fest.id}`}>
        {
          window.innerWidth < 480 ?
          fest.title.toUpperCase() :
          <LinesEllipsis text={fest.title.toUpperCase()} component='span' maxLine={2} title={fest.title} />
        }
      </Link>
    </h6>
  </div>
);

export const FestList = ({ fests, view, addButton, controls, userPage, removeHandler, draft }) => (
  <div 
    className={
      view === 'GRID' ? 
      `flex-wrap-movielist grid-view ${userPage ? 'grid-view--flexStart' : ''}` 
      : ''
    }
  >
    {fests.map((fest, key) => (
      view === 'GRID' ? 
      <div className="grid-col" key={key}>
        <FestGrid fest={fest} controls={controls} removeHandler={removeHandler} draft={draft} />
      </div> :
      <Fest key={key} fest={fest} controls={controls} removeHandler={removeHandler} />
    ))}
  </div>  
);

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};

const Award = ({ award }) => (
	<div className="festival__award" >
		<div className={`festival__award-icon festival__award-icon--${award.type}`}>
		</div>
		<p className="festival__award-type">{award.type}</p>
		<p className="festival__award-title">{award.title}</p>
		<span className="festival__award-reciever">{award.forWhom}</span>
	</div>
);

export const FestSlider = ({ fest }) => (
	<div className="movie-item-style-2">
    <Link to={`/${SINGLE_PAGE.FILM}`} tabIndex={-1} className="film__img film__img--fest">
  		<img src={fest.image} alt={fest.title} />
    </Link>
		<div className="mv-item-infor mv-item-infor--fest">
			<h6><Link to={`/${SINGLE_PAGE.FEST}`}>{fest.title} <span>({fest.year})</span></Link></h6>
		  <ResponsiveEllipsis text={fest.description} component='p' className="describe" maxLine={2} />
			<Slider className="slick-dotted festival__award-slider" {...settings}>
				{
					fest.awards.map((award, key) => <Award award={award} key={key} />)
				}
			</Slider>
		</div>
	</div>
);

export class FestAward extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    const id = this.props.award.id;
    this.controller = new AbortController();
    const signal = this.controller.signal;  

    if(id) { // delete on prod
      fetch(`${API_URL}/film/${id}?projection={"title":2}`, {signal})
        .then(res => res.json())
        .then(data => this.setState({name: data.title}))
        .catch(err => err);
    }
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const { award, icon, image } = this.props;
    const { name } = this.state;

    return (
      <div className="fest-award">
        <div className="fest-award__content">
          <div className={`fest-award__img ${icon ? award.type : ''}`}>
            {image && <img src="" alt="" title={award.type}/>}
          </div>
          <p className="fest-award__title">{award.title}</p>
        </div>
        <Link className="fest-award__link" to={`/film/${award.id}`}>{name}</Link>
      </div>
    );
  }
}

export const FestAwardsList = ({ awards, icon }) => (
  <div> 
    {awards.map((award, key) => <FestAward award={award} key={key} icon={icon}/>)}
  </div>
);