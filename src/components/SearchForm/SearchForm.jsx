import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Fade } from 'react-bootstrap';
import qs from 'query-string';

import { scrollToStart } from '../../utils';
import countries from '../../utils/countriesDB';
import { 
	movieCategories, 
	genres, 
	rating, 
	roles, 
	genders, 
	festCategories 
} from './selectOptions.js';

import { 
	SelectFilter,
	FilterTitle,
	MovieFilterRelease,
	CelebrityFilterName,
	CelebrityFilterBirth,
	FilterCheckbox
} from '../SearchFormInputs/SearchFormInputs';

import { SEARCH_RESULTS } from '../../constants';

const defineValue = (value, arr) => {
	if(value instanceof Array) {
		return value.map(val => {
			let res;
			for(let i = 0; i < arr.length; i++) {
				if(val === arr[i].value) {
					res = arr[i];
				}
			}
			return res;
		});
	} else {
		for(let i = 0; i < arr.length; i++) {
			if(value === arr[i].value) return arr[i];
		}
	}
}

const defineCheckboxValue = (value, defValue) => {
	let ob = defValue;
	value.map(key => ob[key] = true);
	return ob;
}

class SearchForm extends Component {
	constructor(props) {
		super(props);
		const filters = qs.parse(this.props.location.search);
		const locationArr = this.props.location.pathname.split('/').filter(item => !!item);
		const categoriesArr = locationArr[1] === SEARCH_RESULTS.FILMS ? movieCategories : festCategories;

		this.state =  {
			isFaded: true,
			title: !!filters.title ? filters.title : '',
			category: !!filters.category ? defineValue(filters.category.split(','), categoriesArr) : '',
			genres: !!filters.genres ? defineValue(filters.genres.split(','), genres) : '',
			rating: !!filters.rating ? defineValue(+filters.rating, rating) : '',
			release: !!filters.release ? filters.release.split(',') : [],
			name: !!filters.name ? filters.name : '',
			role: !!filters.role ? defineValue(filters.role.split(','), roles) : '',
			birth: !!filters.birth ? filters.birth.split(',') : [],
			gender: !!filters.gender ? defineValue(filters.gender, genders) : '',
			country: !!filters.country ? defineValue(filters.country, countries) : '',
			accredited: !!filters.accredited ? 
									defineCheckboxValue(filters.accredited.split(','), {oscar: false, bafta: false}) : 
									{oscar: false, bafta: false},
			content: !!locationArr[1] ? locationArr[1] : SEARCH_RESULTS.FILMS
		};

		this.clearFilters = this.clearFilters.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.location !== prevProps.location) {
			const filters = qs.parse(this.props.location.search);
			const newState = {
				...prevState,
				title: !!filters.title ? filters.title : '',
				name: !!filters.name ? filters.name : ''
			};
			this.setState(newState);
		}
	}

	handleInputChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		const checked = e.target.checked;

		if(e.target.type === 'checkbox') {
			let accredited = this.state.accredited;
			accredited[name] = checked;
			this.setState(accredited);
		}

		switch (name) {
			case 'releaseFrom': {
				let arr = [value, this.state.release[1]]
				this.setState({release: arr});
				break;
			}
			case 'releaseTo': {
				let arr = [this.state.release[0], value]
				this.setState({release: arr});
				break;
			}
			case 'birthFrom': {
				let arr = [value, this.state.birth[1]];
				this.setState({birth: arr});
				break;
			}
			case 'birthTo': {
				let arr = [this.state.birth[0], value];
				this.setState({birth: arr});
				break;
			}
			case 'content': {
				this.setState({isFaded: false});
				setTimeout(() => {
					let newState = {};
					for(let key in this.state) {
						if(key === 'birth' || key === 'release' ) newState[key] = [];
						else newState[key] = '';
					}
					newState.content = value;
					newState.isFaded = true;
					this.setState(newState);
				}, 300);
				break;
			}
			default: {
				if(e.target.type !== 'checkbox') this.setState({[name]: value});
				break;
			}
		}
	}

	handleSelectChange(selectedOption, select) {
		this.setState({[select]: selectedOption});
	}

	clearFilters() {
		this.setState({
			title: '',
			category: '',
			genres: '',
			rating:'',
			release: ['', ''],
			name: '',
			role: '',
			birth: ['', ''],
			gender: '',
			country: '',
			accredited: {oscars: false, bafta: false}
		});
	}

	combineFilters() {
		let filters = {};

		for(let key in this.state) {
			if (this.state[key] && key !== 'content') {
				if(this.state[key] instanceof Array && this.state[key].length > 0) {
					if(this.state[key][0] && this.state[key][0].value) {
						filters[key] = this.state[key].map(item => item.value);
					} else if(this.state[key][0] || this.state[key][1]) {
						filters[key] = this.state[key];
					}
				} else if (this.state[key].value) {
					filters[key] = this.state[key].value;
				} else if(key === 'accredited') {
					let arr = Object.keys(this.state[key]).filter(key1 => this.state[key][key1]);
					if(arr.length > 0) filters[key] = arr;
				} else if(typeof this.state[key] === 'string') {
					filters[key] = this.state[key];
				}
			}
		}
		return filters;
	}

	handleSubmit(e) {
		e.preventDefault();
		const { content } = this.state;

		const filters = this.combineFilters();
		const queryString = Object.entries(filters).map(([key, val]) => `${key}=${val}`).join('&');

		this.props.push({
      pathname: `/${SEARCH_RESULTS.PAGE}/${content}`, 
      search: `?${queryString}`,
      state: {
      	noScroll: true
      }
    });

    if (window.innerWidth < 991) scrollToStart('topbar-filter');
	}

	renderFilmFilters() {
		return (
			<div>
				<FilterTitle heading='Film' title={this.state.title} handleInputChange={this.handleInputChange} />
				{/*<SelectFilter 
					type='category' 
					heading='Category'
					placeholder='Choose category ...' 
					value={this.state.category} 
					options={movieCategories} 
					handleSelectChange={this.handleSelectChange}
					isMulti={true} />
				<SelectFilter 
					type='genres' 
					heading='Genres'
					placeholder='Choose genre ...'  
					value={this.state.genres} 
					options={genres} 
					handleSelectChange={this.handleSelectChange}
					isMulti={true} />
				<SelectFilter 
					type='country' 
					heading='Country'
					placeholder='Choose country ...' 
					value={this.state.country} 
					options={countries} 
					handleSelectChange={this.handleSelectChange} />
				<MovieFilterRelease 
					releaseFrom={this.state.release[0]} 
					releaseTo={this.state.release[1]}  
					handleInputChange={this.handleInputChange} />*/}
			</div>
		)
	}

	renderTalentFilters() {
		return (
			<div>
				<CelebrityFilterName name={this.state.name} handleInputChange={this.handleInputChange} />
				<SelectFilter 
					type='gender' 
					heading='Gender' 
					placeholder='Choose gender ...'
					value={this.state.gender} 
					options={genders} 
					handleSelectChange={this.handleSelectChange} />
				<SelectFilter 
					type='role' 
					heading='Role' 
					placeholder='Choose role ...'
					value={this.state.role} 
					options={roles} 
					handleSelectChange={this.handleSelectChange} 
					isMulti={true} />
				<SelectFilter 
					type='country' 
					heading='Country'
					placeholder='Choose country ...' 
					value={this.state.country} 
					options={countries} 
					handleSelectChange={this.handleSelectChange} />
				<CelebrityFilterBirth 
					birthFrom={this.state.birth[0]} 
					birthTo={this.state.birth[1]}  
					handleInputChange={this.handleInputChange} />
			</div>
		)
	}

	renderFestFilters() {
		return (
			<div>
				<FilterTitle heading='Festival' title={this.state.title} handleInputChange={this.handleInputChange} />
				<SelectFilter 
					type='country' 
					heading='Country'
					placeholder='Choose country ...' 
					value={this.state.country} 
					options={countries} 
					handleSelectChange={this.handleSelectChange} />
				<SelectFilter 
					type='category' 
					heading='Category'
					placeholder='Choose category ...' 
					value={this.state.category} 
					options={festCategories} 
					handleSelectChange={this.handleSelectChange}
					isMulti={true} />
				<FilterCheckbox 
					type='oscar'
					heading='Oscar Accredited'
					value={this.state.accredited.oscars}
					handleInputChange={this.handleInputChange} />
				<FilterCheckbox 
					type='bafta'
					heading='BAFTA Accredited'
					value={this.state.accredited.bafta}
					handleInputChange={this.handleInputChange} />
			</div>
		)
	}

	render() {
		return (
			<div className="searh-form">
				<h4 className="sb-title">Search for
					<span style={this.state.isFaded ? {} : {opacity: 0}}> Film</span>
				</h4>
				<form className="form-style-1">
					<div className="row">
						<div className="col-md-12 form-it">
							<label htmlFor="content">Search in</label>
							<div className="group-ip">
								<select
									id="content"
									name="content"
									value={this.state.content} 
									className="ui fluid dropdown"
									onChange={this.handleInputChange}>
									<option value={SEARCH_RESULTS.FILMS}>Films</option>
									<option value={SEARCH_RESULTS.TALENT} disabled>Talent</option>
									<option value={SEARCH_RESULTS.FESTS} disabled>Festivals</option>
								</select>
							</div>	
						</div>

						<Fade in={this.state.isFaded} timeout={200}>
							{(() => {
								switch(this.state.content) {
									case SEARCH_RESULTS.FILMS: {
										return this.renderFilmFilters();
									}
									case SEARCH_RESULTS.TALENT: {
										return this.renderTalentFilters();
									}
									case SEARCH_RESULTS.FESTS: {
										return this.renderFestFilters();
									}
									default: {
										return this.renderFilmFilters();
									}
								}
							})()}
						</Fade>

						<div className="search-form__clear-btn-wrapper col-md-12">
							<button 
								type="button" 
								className="search-form__clear-btn"
								onClick={this.clearFilters}>Clear all filters</button>
						</div>

						<div className="col-md-12 ">
							<input 
								className="submit" 
								value="search" 
								type="submit" 
								onClick={e => this.handleSubmit(e)}/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ({search, router}) => {
	return {
		location: router.location
	}
}

const mapDispatchToProps = {
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);