import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import { ContentControl } from '../ContentControls/ContentControls';
import { SINGLE_PAGE, SEARCH_RESULTS } from '../../constants';

import { intersperse } from '../../utils';
import './style.css'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);


export class Talent extends Component {
	render() {
		const { talent, view, controls, removeHandler, dark } = this.props;
		
		return (
			<div className={`talent ${dark ? 'talent--dark' : ''} ${view === 'GRID' ? 'talent--grid' : 'talent--list'}`}>
				{
				controls && 
				<ContentControl 
					content={SEARCH_RESULTS.TALENT} 
          id={talent.id}
					edit={controls.edit} 
					remove={controls.remove} 
					removeHandler={removeHandler} 
					className="content-control--talent" />
				}
				<Link to={`/${SINGLE_PAGE.TALENT}/${talent.id}`} className="talent__image" tabIndex={-1}>
					{talent.image && <img src={talent.image} alt={talent.name} />}
				</Link>
				<div className="talent__info">
					<h2 className="talent__name">
						<Link to={`/${SINGLE_PAGE.TALENT}/${talent.id}`}>
							<ResponsiveEllipsis text={talent.name} maxLine="2" component="span" title={talent.name} />
						</Link>
					</h2>
					{
						(talent.roles && !!talent.roles.length) && 
						view === 'GRID' ?
						<ResponsiveEllipsis 
							className="talent__param"
							text={talent.roles.join(', ') + ';'} 
							maxLine="1" 
							component="span" 
							title={talent.roles.join(', ')} /> :
						(talent.roles && !!talent.roles.length) &&
						<span className="talent__param">{talent.roles.join(', ') + ';'}</span>
					}{' '}
					{
						(talent.country && talent.country.name) &&
						view === 'GRID' ?
						<ResponsiveEllipsis 
							className="talent__param"
							text={talent.country.name} 
							maxLine="1" 
							component="span" 
							title={talent.country.name} /> :
						(talent.country && talent.country.name) &&
						<span className="talent__param">{talent.country.name}</span>
					}
					{
						view === 'LIST' && 
						<ResponsiveEllipsis
							text={talent.biography} 
							className='talent__bio'
							maxLine={2}
							component='p' />
					}
				</div>
			</div>
		);	
	}
}

const TalentDraft = ({talent, controls, removeHandler}) => (
	<div className="talent talent--dark talent--grid talent--draft">
		{
			controls && 
			<ContentControl 
				content={SEARCH_RESULTS.TALENT} 
	      id={talent.id}
				edit={controls.edit} 
				remove={controls.remove} 
				removeHandler={removeHandler} 
				className="content-control--talent" />
		}
		<div className="talent__image">
			{talent.image && <img src={talent.image} alt={talent.firstName + ' ' + talent.lastName} />}
		</div>
		<div className="talent__info">
			<h2 className="talent__name">
				<div>
					<ResponsiveEllipsis 
						text={talent.firstName + ' ' + talent.lastName} 
						maxLine="2" 
						component="span" 
						title={talent.firstName + ' ' + talent.lastName} />
				</div>
			</h2>
			{
				(talent.roles && talent.roles.length) &&
				<ResponsiveEllipsis 
					className="talent__param"
					text={talent.roles.map(role => role.label).join(', ') + ';'} 
					maxLine="1" 
					component="span" 
					title={talent.roles.map(role => role.label).join(', ')} />
			}{' '}
			{
				talent.country &&
				<ResponsiveEllipsis 
					className="talent__param"
					text={talent.country.label} 
					maxLine="1" 
					component="span" 
					title={talent.country.label} />
			}
		</div>
	</div>
)

// {intersperse(talent.roles.map((role, i) => i <= 2 ? role.label : false).filter(k => k), ', ')}
// {talent.country && `, ${talent.country.label}`}

export const TalentList = ({ talents, view, addButton, controls, removeHandler, dark, draft }) => (
	<div className={view === 'GRID' ? "row" : 'list-view'}>
		{talents.map((talent, key) => 
			<div className={view === 'GRID' ? "col-sm-6 col-lg-4" : ''} key={key}>
				{
					!draft ?
					<Talent
						dark={dark} 
						talent={talent} 
						view={view} 
						controls={controls} 
						removeHandler={removeHandler} /> :
					<TalentDraft 
						talent={talent} 
						controls={controls} 
						removeHandler={removeHandler}	/>
				}
			</div>
		)}
  </div>
);


export const TalentSubmit = ({ photo, firstName, lastName, bio, roles, country }) => {
	const name = firstName && `${firstName.trim()} ${lastName.trim()}`;
	return (
		<div className="talent-submit">
			<div className="talent-submit__headshot">
				{ photo && <img src={photo} alt={name}/> }
			</div>
			<div className="talent-submit__info-wrapper">
				{
					firstName && 
					<h3 className={"talent-submit__name"}>
						{name}
					</h3>
				}
				{
					(roles && !!roles.length) && 
					<div className="film-submit__param">
						<span className="film-submit__param-title">Roles:</span>
						<span className="film-submit__param-data">{intersperse(roles.map(role => role.label), ', ')}</span>
					</div>
				}
				{
					(country && country.label) &&
					<div className="film-submit__param">
						<span className="film-submit__param-title">Country:</span>
						<span className="film-submit__param-data">{country.label}</span>
					</div>
				}
				{bio && <ResponsiveEllipsis text={bio} component='p' className="talent-submit__biography" maxLine={3} />}
			</div>
		</div>
	)
};