import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => (value || typeof value === 'number' ? undefined : 'Required.');

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

class UserChangePass extends Component {
	render() {
		return (
			<form className="password" id="changePassword">
				<h4>02. Change password</h4>
				<div className="row">
					<div className="col-md-6 form-it">
						<Field
			        name="oldPass"
			        type="password"
			        component={renderField}
			        label="Old Password"
			        validate={required}
			      />
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 form-it">
						<Field
				        name="newPass"
				        type="password"
				        component={renderField}
				        label="New Password"
				        validate={required}
				      />
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 form-it">
						<Field
			        name="newPassConfirm"
			        type="password"
			        component={renderField}
			        label="Confirm New Password"
			        validate={required}
			      />
					</div>
				</div>
				<div className="row">
					<div className="col-md-2">
						<button className="redbtn redbtn--b-radius" disabled>Change</button>
					</div>
				</div>	
			</form>
		)
	}
}

export default reduxForm({
  form: 'userChangePass',
  enableReinitialize: true
})(UserChangePass);