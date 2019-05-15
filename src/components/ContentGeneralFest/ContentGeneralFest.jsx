import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Select from 'react-select';

import { InputField } from '../ReduxFormField/ReduxFormField';
// import ContentUploadPoster from '../ContentUploadPoster/ContentUploadPoster';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';

import countries from '../../utils/countriesDB';
import { SEARCH_RESULTS } from '../../constants';
import './style.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class ContentGeneralFest extends Component {
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
   	this.props.change('poster', file);
  }

	render() {
		// const { error } = this.state;
		const { handleSubmit, formValues } = this.props;
		// const poster = formValues.poster || '';
		const country = formValues.country || '';

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
			        name="name"
			        type="text"
			        component={InputField}
			        placeholder="Name"
			        label="Name"
			        validate={required} />
			    </div>
		    	<div className="col-md-6 form-it">
		    		<div className="form-group">
				      <label htmlFor="country">Country</label>
								<Select 
									id="country"
									value={country}
									placeholder='Choose country ...' 
									classNamePrefix={'form-select'} 
									options={countries} 
									onChange={selected => this.handleSelectChange(selected, 'country')}
									isClearable={true} />
			     	</div>
		    	</div>
		    </div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<Field id="description" name="description" component="textarea" rows="5"  />
				</div>
				<ContentModalFooter
					formName={'newFestForm'}
					content={SEARCH_RESULTS.FESTS}
					nextTab="awards" />	
			</form>
		)
	}
}

const selector = formValueSelector('newFestForm');
const mapStateToProps = (state) => ({
	formValues: selector(state, 'poster', 'country')
});

ContentGeneralFest = reduxForm({
  form: 'newFestForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ContentGeneralFest);

export default connect(mapStateToProps, null)(ContentGeneralFest);