import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

import { InputField, InputDate } from '../ReduxFormField/ReduxFormField';
// import ContentUploadPoster from '../ContentUploadPoster/ContentUploadPoster';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';

import { SEARCH_RESULTS } from '../../constants';
import countries from '../../utils/countriesDB';
import states from '../../utils/statesUSADB';
import './DatePicker.css';
import './style.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const genderOptions = [
	{value: 'F', label: 'Female'},
	{value: 'M', label: 'Male'},
	{value: null, label: 'Other'}
];

const roleOptions = [
	{value: 'director', label: 'Director'},
	{value: 'writer', label: 'Writer'},
	{value: 'producer', label: 'Producer'},
	{value: 'cast', label: 'Actor'},
	{value: 'dop', label: 'Cinematographer'},
	{value: 'editor', label: 'Editor'},
	{value: 'productionDesigner', label: 'Production Designer'},
	{value: 'costumeDesigner', label: 'Costume Designer'},
	{value: 'music', label: 'Music'},
	{value: 'sound', label: 'Sound'},
];

class ContentGeneralTalent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
    };

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	handleSelectChange(selectedOption, select) {
		this.props.change(select, selectedOption);
	}

  handleFileChange(file) {
   	this.props.change('photo', file);
  }

	render() {
		// const { error } = this.state;
		const { handleSubmit, formValues } = this.props;
		// const photo = formValues.photo || '';
		const country = formValues.country || '';
		const state = formValues.state || '';
		const gender = formValues.gender || '';
		const keywords = formValues.keywords || '';
		const roles = formValues.roles || '';

		return (
			<form onSubmit={handleSubmit(data => console.log(data))}>
				{/*<ContentUploadPoster 
					headshot
					poster={photo}
					error={error}
					uploadHandler={this.handleFileChange}
					errorHandler={error => this.setState({error})}
				 />*/}
				<div className="row">
					<div className="col-md-6 form-it">
						<Field
			        name="firstName"
			        type="text"
			        component={InputField}
			        placeholder="First Name"
			        label="First Name"
			        validate={required}  />
			    </div>
		      <div className="col-md-6 form-it">
			    	<Field
			        name="lastName"
			        type="text"
			        component={InputField}
			        placeholder="Last Name"
			        label="Last Name"
			        validate={required} />
			     </div>
		    </div>
		    <div className="row">
		    	<div className="col-md-6 form-it">
		    		<Field
			        name="dob"
			        label="Date of birth"
			        placeholder="MM/DD/YYYY"
			        component={InputDate} />
		    	</div>
		    	<div className="col-md-6 form-it">
						<div className="form-group">
				      <label htmlFor="gender">Gender</label>
							<Select 
								inputId="gender"
								value={gender}
								placeholder='Choose gender ...' 
								classNamePrefix={'form-select'} 
								options={genderOptions} 
								onChange={selected => this.handleSelectChange(selected, 'gender')}
								isClearable={true} />
			     	</div>
					</div>
		    </div>
		    <div className="row">
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
		    	<div className="col-md-6 form-it">
		    		<div className="form-group">
				      <label htmlFor="talent-state">State</label>
							<Select 
								inputId="talent-state"
								value={state}
								placeholder='Choose state ...' 
								classNamePrefix={'form-select'} 
								options={states} 
								onChange={selected => this.handleSelectChange(selected, 'state')}
								isClearable={true} />
			     	</div>
		    	</div>
		    </div>
				<div className="row">
					<div className="col-md-6 form-it">
						<div className="form-group">
							<Field
				        name="filmSchool"
				        type="text"
				        component={InputField}
				        placeholder="Film School"
				        label="Film School" />
						</div>
					</div>
					<div className="col-md-6 form-it">
						<div className="form-group">
							<label htmlFor="roles">Role</label>
							<Select 
								inputId="roles"
								placeholder='Choose roles ...' 
								classNamePrefix={'form-select'} 
								isMulti={true} 
								value={roles}
								options={roleOptions} 
								onChange={selected => this.handleSelectChange(selected, 'roles')}
								isClearable={true} />
						</div>
					</div>
				</div>
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
				<div className="form-group">
					<label htmlFor="biography">Biography</label>
					<Field id="biography" name="bio" component="textarea" rows="5"  />
				</div>
				<ContentModalFooter
					content={SEARCH_RESULTS.TALENT}
					nextTab="media" />	
			</form>
		)
	}
}

const selector = formValueSelector('newTalentForm');
const mapStateToProps = (state) => ({
	formValues: selector(state, 'country', 'language', 'photo', 'gender', 'keywords', 'roles', 'state')
});

ContentGeneralTalent = reduxForm({
  form: 'newTalentForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ContentGeneralTalent);

export default connect(mapStateToProps, null)(ContentGeneralTalent);