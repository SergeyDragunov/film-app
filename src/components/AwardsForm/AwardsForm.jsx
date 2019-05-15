import React, { Component } from 'react';
import Select, { components } from 'react-select';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';

import { API_URL } from '../../constants';

import './style.css';

const awardTypeOptions = [
  {value: 'Winner', label: 'Winner'},
  {value: 'Nominee', label: 'Nominee'},
  {value: 'Honorable Mention', label: 'Honorable mention'}
];

const CustomSingleValue = (props) => (
  <components.SingleValue {...props}>
    <span className={`award-icon award-icon--option award-icon--${props.data.value.split(' ')[0]}`}></span>
    <span>{props.children}</span>
  </components.SingleValue>
)

const CustomOption = (props) => (
  <components.Option {...props}>
    <span className={`award-icon award-icon--option award-icon--${props.data.value.split(' ')[0]}`}></span>
    {props.children}
  </components.Option>
)

const yearsOptions = () => {
  const curYear = new Date().getFullYear();
  let arr = [];
  for (let i = curYear; i >= 1900; i--) {
    arr.push({
      value: i + "",
      label: i + ""
    });
  }
  return arr;
}

const filterOptions = (value, data) => {
  return data.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
}

const fetchOptions = (inputValue) => {
  return fetch(`${API_URL}/festival?projection={"name":1, "_nmdata":2}`)
  .then(res => res.json())
  .then(data => {
    const festData = data.map(item => ({
      value: item._nmdata.appID,
      label: item.name
    }));

    return filterOptions(inputValue, festData);
  });
}

const initState = {
  year: '',
  fest: '',
  award: '',
  type: '',
  isEdit: false
};

class AwardsForm extends Component {
  constructor(props) {
    super(props);
    this.state = initState;

    this.addAwardsHandler = this.addAwardsHandler.bind(this);
    this.cancelEditHandler = this.cancelEditHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { awardToEdit } = this.props;
    if (awardToEdit && (awardToEdit !== prevProps.awardToEdit)) {
      let newState = {
        year: {value: awardToEdit.year, label: awardToEdit.year},
        fest: {value: awardToEdit.award.id, label: awardToEdit.award.name},
        award: awardToEdit.award.award,
        type: {value: awardToEdit.award.result, label: awardToEdit.award.result},
        isEdit: true
      }

      this.setState(newState);
    }
  }

  addAwardsHandler() {
    const { addAwards } = this.props;
    const { year, fest, award, type } = this.state;

    if (year && fest && award && type) {
      let festAwards = {
        year: year.value,
        id: !fest.__isNew__ ? fest.value : null,
        name: fest.label,
        award: award,
        result: type.value 
      }

      addAwards(festAwards);
      this.setState(initState)
    }
  }

  cancelEditHandler() {
    this.props.cancelEdit();
    this.setState(initState);
  }

  render() {
    const { year, fest, award, type, isEdit } = this.state;
    const isDisabled = !(year && fest && award && type);
    const isResetDisabled = !(year || fest || award || type);

    return (
      <div className="awards-form">
        <h2 className="awards-form__title">Adding new awards</h2>
        
        <div className="awards-form__fest">
          <div className="row">
            <div className="col-sm-6 col-md-2">
              <div className="form-group form-group--marginBottom0 form-group--year">
                <label htmlFor="year">Year</label>
                <Select 
                  inputId="year"
                  value={year}
                  placeholder="YYYY" 
                  classNamePrefix={'form-select'} 
                  isSearchable={false}
                  options={yearsOptions()} 
                  onChange={year => this.setState({year})} />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-group--marginBottom0 form-group--fest">
                <label htmlFor="festival">Festival</label>
                <AsyncCreatable 
                  defaultOptions
                  inputId='festival'
                  cacheOptions
                  classNamePrefix="form-select"
                  placeholder="Choose Festival"
                  loadOptions={fetchOptions} 
                  isClearable={true}
                  value={fest}
                  onChange={fest => this.setState({fest})} />
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-group--marginBottom0 form-group--fest">
                <label htmlFor="awardName">Award's Name</label>
                <input 
                  id="awardName"
                  placeholder="Award" 
                  type="text"
                  value={award}
                  onChange={e => this.setState({award: e.target.value})} />
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-group--marginBottom0 form-group--awardType">
                <label htmlFor="awardType">Award Type</label>
                <Select 
                  inputId="awardType"
                  value={type}
                  placeholder="Type" 
                  classNamePrefix={'form-select'} 
                  isSearchable={false}
                  options={awardTypeOptions} 
                  components={{
                    Option: CustomOption,
                    SingleValue: CustomSingleValue
                  }}
                  onChange={type => this.setState({type})} />
              </div>
            </div>
          </div>
        </div>

        <div className="awards-form__btns">
          <button 
            type="button" 
            className="awards-form__cancel-btn modal__btn modal__btn--white modal__btn--inline"
            disabled={isResetDisabled}
            onClick={this.cancelEditHandler}
          >
           {!isEdit ? "Reset" : "Cancel"} 
          </button>
          <button 
            type="button" 
            className="awards-form__add-festival modal__btn modal__btn--inline"
            disabled={isDisabled}
            onClick={this.addAwardsHandler}
          >
            {!isEdit ? "Add award" : "Edit"}
          </button>
        </div>
      </div>
    )
  }
}

export default AwardsForm;