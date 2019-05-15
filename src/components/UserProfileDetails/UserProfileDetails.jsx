import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import { SelectFilter } from '../SearchFormInputs/SearchFormInputs'

import countries from '../../utils/countriesDB';
import states from '../../utils/statesUSADB';
import { setCountry, setState } from '../../utils';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const renderField = ({
  input,
  label,
  type,
  onChange,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={touched ? (error && 'error') : undefined} />
      {touched &&
        ((error && <span className='error-msg'>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)


class UserProfileDetails extends Component {
	constructor(props) {
		super(props);

		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	handleSelectChange(selectedOption, select) {
		select = select === 'user-country' ? 'country' : select;
		this.props.change(select, selectedOption);
	}

	render() {
		const { handleSubmit, pristine, invalid, user } = this.props;
		
		let countryValue = user.country ? user.country.value : '';

		return (
			<form onSubmit={handleSubmit(data => console.log(data))} className="user">
				<h4>01. Profile details</h4>
				<div className="row">
					<div className="col-md-6 form-it">
						<div>
							<Field
				        name="username"
				        type="text"
				        component={renderField}
				        label="Username"
				        validate={required}
				      />
						</div>
					</div>
					<div className="col-md-6 form-it">
						<div>
							<Field
				        name="email"
				        type="email"
				        component={renderField}
				        label="Email Address"
				        validate={[required, email]}
				      />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 form-it">
						<div>
							<Field
				        name="firstName"
				        type="text"
				        component={renderField}
				        label="First Name"
				        validate={required}
				      />
						</div>
					</div>
					<div className="col-md-6 form-it">
						<div>
							<Field
				        name="lastName"
				        type="text"
				        component={renderField}
				        label="Last Name"
				        validate={required}
				      />
						</div>
					</div>
				</div>
				
				<div className="row">
					<SelectFilter 
						col={6}
						type='user-country' 
						heading='Country'
						placeholder='Choose country ...' 
						value={user.country} 
						options={countries} 
						handleSelectChange={this.handleSelectChange} 
					/>
					{
						countryValue === 'USA' ?
						<SelectFilter 
							col={6}
							type='state' 
							heading='State'
							placeholder='Choose state ...' 
							value={user.subdivision} 
							options={states} 
							handleSelectChange={this.handleSelectChange} 
						/> : null
					}
				</div>
				<div className="row">
					<div className="col-md-2">
						<button className='redbtn redbtn--b-radius' type='submit' disabled={pristine || invalid}>save</button>
					</div>
				</div>	
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	const user = state.user.data.data;
	const country = {value: user.country, label: setCountry(user.country)};
	const subdivision = {value: user.subdivision, label: setState(user.subdivision)};

	return {
		initialValues: {...user, country, subdivision},
		user: state.form.userProfileDetails ? state.form.userProfileDetails.values : {} 
	}
};

UserProfileDetails = reduxForm({
  form: 'userProfileDetails',
  enableReinitialize: true
})(UserProfileDetails);

export default connect(mapStateToProps, null)(UserProfileDetails);

