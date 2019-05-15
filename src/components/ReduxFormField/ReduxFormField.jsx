import React, { Component } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

moment.locale('en')
momentLocalizer();

export const InputField = ({
  input,
  icon,
  name,
  label,
  type,
  placeholder,
  onChange,
  meta: { touched, error, warning },
  meta
}) => (
  <div className="form-group">
    <label htmlFor={input.name}>{label} {icon ? <i className={`icon ion-${icon}`}></i> : ''}</label>
      <input 
        id={input.name}
        {...input} 
        placeholder={placeholder} 
        type={type} 
        className={touched ? (error && 'error') : undefined} />
      {touched &&
        ((error && <span className='error-msg'>{error}</span>) ||
          (warning && <span>{warning}</span>))}
  </div>
);

export class InputDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerOpen: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.props.change('releaseDateUS', date);
  }

  render() {
    const {
      input: { onChange, value },
      input,
      label,
      placeholder,
      meta: { touched, error, warning }
    } = this.props;
    const { datePickerOpen } = this.state;

    return (
      <div className="form-group">
        <label htmlFor={input.name + '_input'}>{label}</label>
        <DateTimePicker
          id={input.name}
          containerClassName={`DatePicker ${touched ? (error && 'error') : undefined}`}
          dateIcon={null}
          time={false}
          value={!value ? null : new Date(value)}
          open={datePickerOpen}
          placeholder={placeholder}
          onToggle={() => false}
          inputProps={{
            ...input,
            id: input.name,
            onClick: () => this.setState({datePickerOpen: 'date'})
          }}
          onFocus={() => this.setState({datePickerOpen: 'date'})}
          onBlur={() => this.setState({datePickerOpen: false})}
          onChange={value => {
            this.setState({ datePickerOpen: false })
            onChange(value);
          }}
        />
        {touched &&
          ((error && <span className='error-msg'>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    )
  }
}

function cc_format(value) {
  let v = value.replace(/\s+/g, '').replace(/\D+/gi, '');
  let matches = v.match(/\d{2,6}/g);
  let match = (matches && matches[0]) || '';
  let parts = [];
  for (let i=0, len=match.length; i<len; i+=2) {
    parts.push(match.substring(i, i+2));
  }

  if (parts.length) {
    return parts.join(':');
  } else {
    return v;
  }
}

export const TimeField = ({
  input,
  icon,
  label,
  type,
  placeholder,
  onChange,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label htmlFor={input.name}>{label} {icon ? <i className={`icon ion-${icon}`}></i> : ''}</label>
      <input 
        {...input} 
        id={input.name}
        placeholder={placeholder} 
        type={type} 
        value={cc_format(input.value)}
        className={touched ? (error && 'error') : undefined} />
      {touched &&
        ((error && <span className='error-msg'>{error}</span>) ||
          (warning && <span>{warning}</span>))}
  </div>
);