import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import { TalentLink } from '../Links/Links';

import { SINGLE_PAGE, SEARCH_RESULTS } from '../../constants';
import { ContentControl } from '../ContentControls/ContentControls';
import { ReadMoreOverlay } from '../MediaItem/MediaItem';

import './style.css';
import { intersperse } from '../../utils';
 
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

export class Film extends Component {
	render() {
		const { film, controls, removeHandler } = this.props;
		
		return (
			<div className="film">
				<div className="film__poster">
					<Link to={`/${SINGLE_PAGE.FILM}/${film.id}`} tabIndex={-1}>
						{film.image && <img src={film.image} alt={film.title} />}
					</Link>
					{
						controls && 
						<ContentControl
							content={SEARCH_RESULTS.FILMS} 
							id={film.id} 
							edit={controls.edit}
							remove={controls.remove}
							removeHandler={removeHandler} 
							className="content-control--film" />
					}
				</div>
				<div className="film__info-wrapper">
					<h6 className="film__title">
						<Link to={`/${SINGLE_PAGE.FILM}/${film.id}`}>
							{film.title} {film.year ? <span className="film__year">({film.year})</span> : null}
						</Link>
					</h6>
					{
						film.description && 
						<ResponsiveEllipsis text={film.description} component='p' className="film__description" maxLine={2} />
					}
					<div className="film__param-wrapper"> 
						{
							film.runTime && 
							<div className="film__param">
								<span className="film__param-title">Run Time:</span> 
								<span className="film__param-data">{film.runTime}</span>
							</div>
						}
						{
							film.release && 
							<div>
								<span className="film__param-title">Release:</span> 
								<span className="film__param-data">{film.release}</span>
							</div>
						}
					</div>
					{
						film.credits &&
						Object.keys(film.credits).map((credit, key) => (
							!!film.credits[credit].length &&
							<div className="film__param" key={key}>
								<span className="film__param-title">{credit}: </span> 
								<span className="film__param-data">
									{intersperse(film.credits[credit].map((id, key) => <TalentLink id={id} key={key} />), ', ')}
								</span>
							</div>
						))
					}
					{
						film.country.name &&
						<div className="film__param">
							<span className="film__param-title">Country: </span> <span className="film__param-data">{film.country.name}</span>
						</div> 
					}
					{
						(film.category && !!film.category.length) &&
						<div className="film__param">
							<span className="film__param-title">Categories: </span> 
							<span className="film__param-data">
								{intersperse(film.category.map((category, key) => category), ', ')}
							</span>
						</div> 
					}
					{
						!!film.genres.length &&
						<div className="film__param">
							<span className="film__param-title">Genres: </span> 
							<span className="film__param-data">
								{intersperse(film.genres.map((genre, key) => genre), ', ')}
							</span>
						</div> 
					}
				</div>
			</div>
		)
	}
}

export class FilmGrid extends Component {
	render() {
		const { film, controls, removeHandler, draft } = this.props;

		return (
			<div className={`film-grid ${draft ? 'film-grid--draft' : ''}`}>
				<div className="film-grid__main">
					<div className="film-grid__poster">
						{
							film.image && 
							<Link
								tabIndex={-1}
								to={`/${SINGLE_PAGE.FILM}/${film.id}`}>
								<img src={film.image} alt={film.title} />
							</Link>
						}
					</div>
					{
						controls && 
						<ContentControl
							content={SEARCH_RESULTS.FILMS} 
							id={film.id} 
							edit={controls.edit}
							remove={controls.remove}
							removeHandler={removeHandler} 
							className="content-control--film" />
					}
					<ReadMoreOverlay link={`/${SINGLE_PAGE.FILM}/${film.id}`} />
				</div>
				<h6 className="film-grid__title">
					<Link to={`/${SINGLE_PAGE.FILM}/${film.id}`}>
						{
							window.innerWidth < 480 ?
							film.title.toUpperCase() :
							<LinesEllipsis text={film.title.toUpperCase()} component='span' maxLine={2} title={film.title} />
						}
					</Link>
				</h6>
			</div>	
		);
	}
}

export class FilmDraftGrid extends Component {
	render() {
		const { film, controls, removeHandler } = this.props;

		return (
			<div className="film-grid film-grid--draft">
				<div className="film-grid__main">
					<div className="film-grid__poster">
						{
							film.image && 
							<img src={film.image} alt={film.title} />
						}
					</div>
					{
						controls && 
						<ContentControl
							content={SEARCH_RESULTS.FILMS} 
							id={film.id} 
							edit={controls.edit}
							remove={controls.remove}
							removeHandler={removeHandler} 
							className="content-control--film" />
					}
				</div>
				<h6 className="film-grid__title">
					{
						window.innerWidth < 480 ?
						film.title.toUpperCase() :
						<LinesEllipsis text={film.title.toUpperCase()} component='span' maxLine={2} title={film.title} />
					}
				</h6>
			</div>	
		);
	}
}


export const FilmList = ({ films, view , addButton, controls, userPage, draft, removeHandler }) => (
	<div 
    className={
      view === 'GRID' ? 
      `flex-wrap-movielist grid-view ${userPage ? 'grid-view--flexStart' : ''}` 
      : 'list-view'
    }
  >
		{films.map((film, key) => (
			view === 'GRID' ? 
			<div className="grid-col" key={key}>
				{
					draft ?
					<FilmDraftGrid film={film} controls={controls} removeHandler={removeHandler} /> :
					<FilmGrid film={film} controls={controls} removeHandler={removeHandler} />
				}
			</div> :
			<Film key={key} film={film}  controls={controls} removeHandler={removeHandler} />
		))}
	</div>	
);


export const TalentFilm = ({ film }) => (
	<div className="talent-film">
		<div className="talent-film__content">
			<div className="talent-film__image">
				{film.image && <img src={film.image} alt={film.title}/>}
			</div>
			<div className="talent-film__info">
				<Link className="talent-film__title" to={`/${SINGLE_PAGE.FILM}/${film.id}`}>{film.title}</Link>
				<p className="talent-film__role">{film.role}</p>
			</div>
		</div>
		<p className="talent-film__year">...  {film.year}</p>
	</div>
);

export const FilmographyList = ({ films }) => (
	<div className="mvcast-item">	
		{films.map((film, key) => <TalentFilm film={film} key={key}/>)}
	</div>
);

export const FilmSubmit = ({ poster, title, name, synopsis, country, category, genres, credits, releaseDateUS }) => (
	<div className="film-submit">
		<div className="film-submit__poster">
			{ poster && <img src={poster} alt={title}/> }
		</div>
		<div className="film-submit__info-wrapper">
			{
				(title || name) && 
				<h3 className={"film-submit__title " + (synopsis || 'film-submit__title--underline')}>
					{title ? title.trim() : name.trim()}{" "}
					<span className="film-submit__year">({releaseDateUS && new Date(releaseDateUS).getFullYear()})</span>
				</h3>
			}
			{synopsis && <ResponsiveEllipsis text={synopsis} component='p' className="film-submit__description" maxLine={3} />}
			{
				country && 
				<div className="film-submit__param">
					<span className="film-submit__param-title">Country:</span>
					<span className="film-submit__param-data">{country.label}</span>
				</div>
			}
			{
				(category && !!category.length) && 
				<div className="film-submit__param">
					<span className="film-submit__param-title">Categories:</span>
					<span className="film-submit__param-data">{intersperse(category.map(cat => cat.label), ', ')}</span>
				</div>
			}
			{
				(genres && !!genres.length) && 
				<div className="film-submit__param">
					<span className="film-submit__param-title">Genres:</span>
					<span className="film-submit__param-data">{intersperse(genres.map(genre => genre.label), ', ')}</span>
				</div>
			}
			{
				(credits && !!credits.length) && 
				credits.map((credit, key) => (
					<div className="film-submit__param" key={key}>
						<span className="film-submit__param-title">{credit.role.label}:</span>
						<span className="film-submit__param-data">
							{
								intersperse(credit.members.map((member, key) => 
									member.__isNew__ ? 
									member.label :
									<Link 
										key={key}
										to={`/talent/${member.value}`}
										target='_blank'>{member.label}</Link>
								), ', ')
							}
						</span>
					</div>
				))
			}
		</div>
	</div>
);