import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import { InputField, InputDate, TimeField } from '../ReduxFormField/ReduxFormField';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';
// import ContentUploadPoster from '../ContentUploadPoster/ContentUploadPoster';

import { movieCategories, genres as genresOptions } from '../SearchForm/selectOptions'
import countries from '../../utils/countriesDB';
import languages from '../../utils/languagesDB';
import { SEARCH_RESULTS } from '../../constants';
import 'react-widgets/dist/css/react-widgets.css';
import './DatePicker.css';
import './style.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class ContentGeneralFilm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			datePickerOpen: false
    };

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	handleSelectChange(selectedOption, select) {
		this.props.change(select, selectedOption);
	}
  handleFileChange(file) {
   	this.props.change('poster', file);
  }

	render() {
		// const { error } = this.state;
		const { handleSubmit, formValues, match } = this.props;
		// const poster = formValues.poster || '';
		const country = formValues.country || '';
		const language = formValues.language || '';
		const category = formValues.category || '';
		const genres = formValues.genres || '';
		const keywords = formValues.keywords || '';

		return (
			<form onSubmit={handleSubmit(data => console.log(data))}>
				{/*<ContentUploadPoster 
					poster={poster}
					error={error}
					uploadHandler={this.handleFileChange}
					errorHandler={error => this.setState({error})}
				 />*/}
				<div className="row">
					<div className="col-md-6 form-it">
						<Field
							inputId="title"
			        name="title"
			        type="text"
			        component={InputField}
			        placeholder="Title"
			        label="Title"
			        validate={required} />
			    </div>
		      <div className="col-md-6 form-it">
			    	<Field
			        name="altTitle"
			        type="text"
			        component={InputField}
			        placeholder="Alternative Title"
			        label="Alternative Title" />
			     </div>
		    </div>
		    <div className="row">
		    	<div className="col-md-6 form-it">
			      <Field
			        name="releaseDateUS"
			        label="Release Date"
			        placeholder="MM/DD/YYYY"
			        component={InputDate}
			        validate={required} />
		    	</div>
		    	<div className="col-md-6 form-it">
		    		<div className="form-group">
				      <label htmlFor="country">Country</label>
							<Select 
								inputId="country"
								value={country}
								placeholder='Choose country ...' 
								classNamePrefix={'form-select'} 
								options={countries} 
								onChange={selected => this.handleSelectChange(selected, 'country')}
								isClearable={true} />
			     	</div>
		    	</div>
		    </div>
		    <div className="row">
		    	<div className="col-md-6 form-it">
						<div className="form-group">
							<label htmlFor="category">Category</label>
							<Select 
								inputId="category"
								value={category}
								placeholder='Choose category ...' 
								classNamePrefix={'form-select'}
								isMulti={true} 
								options={movieCategories} 
								onChange={selected => this.handleSelectChange(selected, 'category')}
								isClearable={true} />
						</div>
					</div>
					<div className="col-md-6 form-it">
						<div className="form-group">
							<label htmlFor="genres">genres</label>
							<Select 
								inputId="genres"
								value={genres}
								placeholder='Choose genres ...' 
								classNamePrefix={'form-select'} 
								isMulti={true} 
								options={genresOptions} 
								onChange={selected => this.handleSelectChange(selected, 'genres')}
								isClearable={true} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 form-it">
						<div className="form-group">
							<label htmlFor="keywords">keywords</label>
							<CreatableSelect 
								inputId="keywords"
								placeholder='Choose keywords ...' 
								classNamePrefix={'form-select'} 
								isMulti={true} 
								value={keywords}
								options={[]} 
								onChange={selected => this.handleSelectChange(selected, 'keywords')}
								isClearable={true} />
						</div>
					</div>
					<div className="col-md-6 form-it">
						<div className="form-group">
							<label htmlFor="language">language</label>
							<Select 
								inputId="language"
								placeholder='Choose language ...' 
								classNamePrefix={'form-select'} 
								value={language}
								options={languages} 
								onChange={selected => this.handleSelectChange(selected, 'language')}
								isClearable={true} />
						</div>
					</div>
				</div>
				<Field
	        name="runningTime"
	        type="text"
	        component={TimeField}
	        placeholder="HH:MM:SS"
	        label="Running Time" />
				<div className="form-group">
					<label htmlFor="synopsis">Synopsis</label>
					<Field id="synopsis" name="synopsis" component="textarea" rows="5"  />
				</div>
				<ContentModalFooter
					match={match}
					content={SEARCH_RESULTS.FILMS}
					nextTab="credits" />	
			</form>
		)
	}
}

const selector = formValueSelector('newFilmForm');
const mapStateToProps = (state) => ({
	formValues: selector(state, 'country', 'language', 'releaseDateUS', 'poster', 'category', 'genres', 'keywords')
});

ContentGeneralFilm = reduxForm({
  form: 'newFilmForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ContentGeneralFilm);

export default connect(mapStateToProps, null)(ContentGeneralFilm);