import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formValueSelector, change } from 'redux-form';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import Select from 'react-select';

import { ContentControl } from '../ContentControls/ContentControls';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';

import './style.css';
import { intersperse } from '../../utils';
import { API_URL, SINGLE_PAGE, SEARCH_RESULTS } from '../../constants';

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

/*
	UI CREDITS
	const credits = [
		{
			role: {
				value: "string",
				label: "string"
			}
			members: [
				{
					value: "string",
					label: "string"
				}
			]
		}
	]
*/

class ContentCredits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: '',
			role: '',
			credits: [],
			creditsOptions: options
    };

    this.addLink = this.addLink.bind(this);
    this.editCredit = this.editCredit.bind(this);
    this.removeCredit = this.removeCredit.bind(this);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
	}

	filterOptions(value, data) {
		return data.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
	}

	fetchOptions(inputValue) {
		return fetch(`${API_URL}/talent?projection={"name":1, "_nmdata":2}`)
		.then(res => res.json())
		.then(data => {
			const talentData = data.map(talent => ({
				value: talent._nmdata.appID,
				label: talent.name
			}));

			return this.filterOptions(inputValue, talentData);
		});
	}

	addLink() {
		const { members, role } = this.state;
		const newMember = { role,	members	};
		let isNewCredit = true;

		let credits = this.props.credits.map(credit => {
			if (role.value === credit.role.value) {
				isNewCredit = false
				return newMember;
			} 
			return credit;
		});
		if (isNewCredit) credits = [...this.props.credits, newMember];

		this.props.change('newFilmForm','credits', credits);
		this.setState({
			members: '',
			role: '',
		});
	}

	editCredit({ members, role }) {
		this.setState({ members, role	});
	}

	removeCredit(roleValue) {
		const credits = this.props.credits.filter(credit => credit.role.value !== roleValue);
		this.props.change('newFilmForm',"credits", credits);
	}

	render() {
		const { members, role } = this.state;
		const { credits } = this.props;
		const isDisabled = !!members.length && !!Object.keys(role).length;

		const creditsOptions = options.filter(option => {
			for (let i = 0; i < credits.length; i++) {
				if (option.value === credits[i].role.value) return false;
			}
			return true;
		});

		return (
			<div>
				<div className="content-credits__row">
					<div className="content-credits__col content-credits__input-wrapper">
						<div className="form-group form-group--marginBottom0">
							<label htmlFor="memberName">Member's Name</label>
							<AsyncCreatable 
								inputId='memberName'
								cacheOptions
				        classNamePrefix="form-select"
				        placeholder="Search or Create Member"
				        loadOptions={this.fetchOptions}
				        isMulti={true} 
								isClearable={true}
								value={members}
								onChange={value => this.setState({members: value})} />
						</div>
					</div>
					<div className="content-credits__col content-credits__roles-wrapper">
						<div className="form-group form-group--marginBottom0">
							<label htmlFor="role">Member's Role</label>
							<Select 
								inputId="role"
								value={role}
								isSearchable={false}
								name="role"
								placeholder="Choose Role"
								classNamePrefix="form-select"
								options={creditsOptions}
								onChange={value => this.setState({role: value})} />
						</div>
					</div>
					<div className="content-credits__col content-credits__add-btn-wrapper">
						<button 
							type='button' 
							onClick={this.addLink} 
							className="content-credits__add-btn modal__btn modal__btn--inline" 
							disabled={!isDisabled}>Add</button>
					</div>
				</div>
				<Collapse in={!!credits.length}>
					<div>
						<h2>Credits</h2>
						<div className="content-credits__credits-list">
							{credits.map((credit, key) => (
								<div className="content-credit-item row" key={key}>
									<span className="col-xs-12 col-sm-3 content-credit-item__role">{credit.role.label}:</span>
									<div className="col-sm-7">
										{intersperse(credit.members.map((member, i) => (
											member.__isNew__ ?
											<span key={i}>{member.label}</span> :
											<Link to={`/${SINGLE_PAGE.TALENT}/${member.value}`} key={i}>{member.label}</Link> 
										)), ', ')}
									</div>
									<div className="col-sm-2">
										<ContentControl 
											edit 
											remove
											className="content-control--credits" 
											editHandler={() => this.editCredit(credit)}
											removeHandler={() => this.removeCredit(credit.role.value)} />
									</div>
								</div>
							))}
						</div>
					</div>
				</Collapse>
				<ContentModalFooter
					formName="newFilmForm"
					content={SEARCH_RESULTS.FILMS}
					nextTab="media" />	
			</div>
		)
	}
}

const selector = formValueSelector('newFilmForm');
const mapStateToProps = state => ({
	credits: selector(state, 'credits') || []
});

export default connect(mapStateToProps, { change })(ContentCredits);