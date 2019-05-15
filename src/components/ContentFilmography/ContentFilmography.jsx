import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formValueSelector, change } from 'redux-form';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import Select from 'react-select';

import './style.css';

import { intersperse } from '../../utils';
import { API_URL, SINGLE_PAGE, SEARCH_RESULTS } from '../../constants';

import { ContentControl } from '../ContentControls/ContentControls';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';

const options = [
	{value: 'director', label: 'Director'},
	{value: 'writer', label: 'Writer'},
	{value: 'producer', label: 'Producer'},
	{value: 'dop', label: 'Cinematographer'},
	{value: 'editor', label: 'Editor'},
	{value: 'productionDesigner', label: 'Production Designer'},
	{value: 'costumeDesigner', label: 'Costume Designer'},
	{value: 'music', label: 'Music'},
	{value: 'sound', label: 'Sound'},
	{value: 'cast', label: 'Cast'}
];

class ContentFilmography extends Component {
	constructor(props) {
		super(props);
		this.state = {
			film: '',
			roles: [],
			credits: []
    };

    this.addFilm = this.addFilm.bind(this);
    this.editFilm = this.editFilm.bind(this);
    this.removeFilm = this.removeFilm.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
	}

	filterOptions(value, data) {
		return data.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
	}

	fetchOptions(inputValue) {
		return fetch(`${API_URL}/film?projection={"title":1, "_nmdata":2}`)
		.then(res => res.json())
		.then(data => {
			const filmData = data.map(film => ({
				value: film._nmdata.appID,
				label: film.title
			}));

			return this.filterOptions(inputValue, filmData);
		});
	}

	addFilm() {
		const { film, roles } = this.state;
		const newFilm = { roles,	film };
		let isNewFilm = true;

		let filmography = this.props.filmography.map(item => {
			if (film.value === item.film.value) {
				isNewFilm = false
				return newFilm;
			} 
			return item;
		});
		if (isNewFilm) filmography = [...this.props.filmography, newFilm];

		this.props.change('newTalentForm', 'filmography', filmography);
		this.setState({
			film: '',
			roles: '',
		});
	}

	editFilm({ film, roles }) {
		this.setState({ film, roles	});
	}

	removeFilm(filmValue) {
		const filmography = this.props.filmography.filter(film => film.film.value !== filmValue);
		this.props.change('newTalentForm', "filmography", filmography);
	}

	render() {
		const { film, roles } = this.state;
		const { filmography } = this.props;
		const isDisabled = film && !!roles.length;

		return (
			<form>
				<div className="content-filmography__row">
					<div className="content-filmography__col content-filmography__input-wrapper">
						<div className="form-group form-group--marginBottom0">
							<label htmlFor="film">Film</label>
							<AsyncCreatable 
								inputId='film'
								cacheOptions
				        classNamePrefix="form-select"
				        placeholder="Search or Create Film"
				        loadOptions={this.fetchOptions} 
								isClearable={true}
								value={film}
								onChange={value => this.setState({film: value})} />
						</div>
					</div>
					<div className="content-filmography__col content-filmography__roles-wrapper">
						<div className="form-group form-group--marginBottom0">
							<label htmlFor="roles">Roles</label>
							<Select 
								inputId="roles"
								value={roles}
								isSearchable={false}
								name="roles"
								isMulti
								placeholder="Choose Role"
								classNamePrefix="form-select"
								options={options}
								onChange={value => this.setState({roles: value})} />
						</div>
					</div>
					<div className="content-filmography__col content-filmography__add-btn-wrapper">
						<button 
							type='button' 
							onClick={this.addFilm} 
							className="content-filmography__add-btn modal__btn modal__btn--inline" 
							disabled={!isDisabled}>Add</button>
					</div>
				</div>
				<Collapse in={!!filmography.length}>
					<div>
						<h2>Filmography</h2>
						<div className="content-filmography__films-list">
							{filmography.map((film, key) => (
								<div className="content-film-item" key={key}>
									<div className="content-film-item__title">
										{
											film.film.__isNew__ ?
											<span>{film.film.label}</span> :
											<Link target='_blank' to={`/${SINGLE_PAGE.FILM}/${film.film.value}`}>{film.film.label}</Link>
										}
									</div>
									<div className="content-film-item__roles">
										{intersperse(film.roles.map((role, i) => <span key={i}>{role.label}</span>), ', ')}
									</div>
									<ContentControl 
										static
										edit 
										remove
										className="content-control--filmography" 
										editHandler={() => this.editFilm(film)}
										removeHandler={() => this.removeFilm(film.film.value)} />
								</div>
							))}
						</div>
					</div>
				</Collapse>
				<ContentModalFooter
					formName="newTalentForm"
					content={SEARCH_RESULTS.TALENT}
					nextTab="media" />	
			</form>
		)
	}
}

const selector = formValueSelector('newTalentForm');
const mapStateToProps = state => ({
	filmography: selector(state, 'filmography') || []
});

// ContentFilmography = reduxForm({
//   form: 'newFilmForm',
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true
// })(ContentFilmography);

export default connect(mapStateToProps, {change})(ContentFilmography);