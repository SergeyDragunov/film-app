import React from 'react';
import Select from 'react-select';

import customStyles from './selectStyles';

export const FilterTitle = ({ title, handleInputChange, heading }) => (
	<div className="col-md-12 form-it">
		<label htmlFor='title'>{heading} name</label>
		<input 
			id='title' 
			name='title'
			type="text" 
			placeholder="Enter keywords"
			value={title}
			onChange={handleInputChange} />
	</div>
);

export const FilterCheckbox = ({ type, heading, value, handleInputChange }) => (
	<div className="col-md-12 form-it">
		<div className="filter-checkbox">
			<input 
				id={type}
				name={type}
				className='sr-only'
				type="checkbox"
				checked={value}
				onChange={handleInputChange} />
			<label htmlFor={type} style={{margin: 0}}>{heading}</label>
		</div>
	</div>
);

export class SelectFilter extends React.Component {
	render() {
		const { 
			type, 
			heading, 
			placeholder, 
			value, options, 
			handleSelectChange, 
			isMulti, 
			col = 12 
		} = this.props;

		return (
			<div className={`col-md-${col} form-it`}>
				<label htmlFor={type}>{heading}</label>
				<div>
					<Select 
						inputId={type}
						placeholder={placeholder}
						classNamePrefix={'filter-select'} 
						options={options} 
						styles={customStyles}
						value={value}
						onChange={selected => handleSelectChange(selected, type)}
						isMulti={isMulti} 
						isClearable={true} />
				</div>	
			</div>
		);
	}
}

export const MovieFilterRelease = ({ releaseFrom, releaseTo, handleInputChange }) => (
	<div className="col-md-12 form-it">
		<label htmlFor="releaseFrom">Release Year</label>
		<label htmlFor="releaseTo" className="sr-only">Release Year</label>
		<div className="row">
			<div className="col-md-6">
				<select
					id="releaseFrom"
					name="releaseFrom"
					value={releaseFrom}
					onChange={handleInputChange}>
				  <option value="">From</option>
				  {(() => {
				  	let arr = [];
				  	const toDate = !!releaseTo ? releaseTo : 2020;
				  	for(let i = 1900; i <= +toDate; i += 10) {
				  		arr.push(<option value={i} key={i}>{i}</option>);
				  	}
				  	return arr;
				  })()}
				</select>
			</div>
			<div className="col-md-6">
				<select
					id="releaseTo"
					name="releaseTo"
					className="last-search-input"
					value={releaseTo}
					onChange={handleInputChange}>
				  <option value="">To</option>
				  {(() => {
				  	let arr = [];
				  	const fromDate = !!releaseFrom ? releaseFrom : 1900;
				  	for(let i = +fromDate; i <= 2020; i += 10) {
				  		arr.push(<option value={i} key={i}>{i}</option>);
				  	}
				  	return arr;
				  })()}
				</select>
			</div>
		</div>
	</div>
);

export const CelebrityFilterName = ({name, handleInputChange}) => (
	<div className="col-md-12 form-it">
		<label htmlFor='name'>Talent name</label>
		<input 
			id='name'
			name='name'
			type="text" 
			placeholder="Enter keywords"
			value={name} 
			onChange={handleInputChange} />
	</div>
);

export const CelebrityFilterBirth = ({birthFrom, birthTo, handleInputChange}) => (
	<div className="col-md-12 form-it">
		<label htmlFor='birthFrom'>Year of birth</label>
		<label htmlFor='birthTo' className='sr-only'></label>
		<div className="row">
			<div className="col-md-6">
				<select
					id='birthFrom'
					name='birthFrom'
					value={birthFrom} 
					onChange={handleInputChange} >
				  <option value="">From</option>
				  {(() => {
				  	let arr = [];
				  	const toDate = !!birthTo ? birthTo : 2020;
				  	for(let i = 1900; i <= +toDate; i += 10) {
				  		arr.push(<option value={i} key={i}>{i}</option>);
				  	}
				  	return arr;
				  })()}
				</select>
			</div>
			<div className="col-md-6">
				<select
					id='birthTo'
					name='birthTo'
					className="last-search-input"
					value={birthTo} 
					onChange={handleInputChange}>
				  <option value="">To</option>
				  {(() => {
				  	let arr = [];
				  	const fromDate = !!birthFrom ? birthFrom : 1900;
				  	for(let i = +fromDate; i <= 2020; i += 10) {
				  		arr.push(<option value={i} key={i}>{i}</option>);
				  	}
				  	return arr;
				  })()}
				</select>
			</div>
		</div>
	</div>
);


/* Blog */

export const FilterRadio = ({ id, name, value, handleChange, label, checked }) => (
	<div className="filter-radio">
		<input 
			id={id}
			name={name}
			checked={checked}
			className='sr-only'
			type="radio"
			value={value} 
			onChange={handleChange} />
		<label htmlFor={id}>{label}</label>
	</div>
);