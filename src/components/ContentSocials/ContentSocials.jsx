import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { change, formValueSelector } from 'redux-form';
import Select, { components } from 'react-select';

import { SEARCH_RESULTS } from '../../constants';

import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';

import './style.css';

const checkURL = url => /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);

const socials = [
	{value: 'website', label: 'Website'},
	{value: 'imdb', label: 'IMDb'},
	{value: 'facebook', label: 'Facebook'},
	{value: 'twitter', label: 'Twitter'},
	{value: 'tumblr', label: 'Tumblr'},
	{value: 'vimeo', label: 'Vimeo'},
	{value: 'youtube', label: 'YouTube'},
	{value: 'instagram', label: 'Instagram'},
	{value: 'wikipedia', label: 'Wikipedia'},
];

const talentSocials = [
	{value: 'email', label: 'Email'},
	{value: 'linkedin', label: 'LinkedIn'}
];

const CustomSingleValue = (props) => (
	<components.SingleValue {...props}>
		{
			props.data.value === 'website' ||
			props.data.value === 'imdb' ||
			props.data.value === 'wikipedia' ?
			<span className={`social-icon social-icon--${props.data.value}`}></span> :
			props.data.value === 'email' ?
			<i className={`icon icon--mail ion-md-mail`}></i> :
			<i className={`icon icon--${props.data.value} ion-logo-${props.data.value}`}></i>
		}
		<span>{props.children}</span>
	</components.SingleValue>
)

const CustomOption = (props) => (
	<components.Option {...props}>
		{
			props.data.value === 'website' ||
			props.data.value === 'imdb' ||
			props.data.value === 'wikipedia' ?
			<span className={`social-icon social-icon--${props.data.value}`}></span> :
			props.data.value === 'email' ?
			<i className={`icon icon--mail ion-md-mail`}></i> :
			<i className={`icon icon--${props.data.value} ion-logo-${props.data.value}`}></i>
		}
		{props.children}
	</components.Option>
)

class ContentSocials extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			social: '',
			socialOptions: socials,
			error: ''
    };

    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
	}

	componentDidMount() {
		const { content } = this.props;
		let socialOptions = [...this.state.socialOptions];

		if (content === SEARCH_RESULTS.TALENT) socialOptions = [...talentSocials, ...this.state.socialOptions];
		this.setState({socialOptions});
	}

	addLink() {
		if (this.state.value && this.state.social) {
			if (checkURL(this.state.value)) {
				const newLink = {
					src: this.state.value,
					type: this.state.social.value
				};

				const links = [...this.props.socialLinks, newLink];
				this.props.change(this.props.formName, "socials", links);
				this.setState({
					value: '',
					social: ''
				});
			} else {
				this.setState({error: 'Please, insert proper link'})
			}
		}
	}

	removeLink(type) {
		const links = this.props.socialLinks.filter(link => link.type !== type);
		this.props.change(this.props.formName, "socials", links);
	}

	render() {
		const { value, social, socialOptions, error } = this.state;
		const { socialLinks: links, content, formName } = this.props;
		const isDisabled = !!value.length && !!Object.keys(social).length;

		const options = socialOptions.filter(option => {
			for (let i = 0; i < links.length; i++) {
				if (option.value === links[i].type) return false
			}
			return true
		});

		return (
			<form>
				<div className="content-social__row">
					<div className="content-social__col content-social__input-wrapper">
						<div className="form-group form-group--marginBottom0">
							<label htmlFor="socialLink">Social Link</label>
							<input
								id='socialLink'
								className={error ? 'error' : ''}
				        type="text"
				        name="socialLink"
				        placeholder="Place Social Link Here"
				        value={value}
				        onChange={e => this.setState({value: e.target.value, error: ''})}
				        onKeyPress={e => { 
				        	if (e.key === 'Enter') {
				        		e.preventDefault();
				        		this.addLink();
				        	} 
				        }} />
				        {	error && <span className="error-msg">{ error }</span> }
						</div>
					</div>
					<div className="content-social__col content-social__networks-wrapper">
						<div className="form-group form-group--marginBottom0">
							<label htmlFor="socialNetwork">Social Networks</label>
							<Select 
								inputId='socialNetwork'
								value={social}
								className="form-select--socials"
								isSearchable={false}
								components={{
									Option: CustomOption,
									SingleValue: CustomSingleValue
								}}
								name="socialNetwork"
								placeholder="Choose Social Network"
								classNamePrefix="form-select"
								options={options}
								onChange={value => this.setState({social: value})} />
						</div>
					</div>
					<div className="content-social__col content-social__add-btn-wrapper">
						<button 
							type='button' 
							onClick={this.addLink} 
							className="content-social__add-btn modal__btn modal__btn--inline"
							disabled={!isDisabled}>Add</button>
					</div>
				</div>
				<span className="content-social__help-text">
					E.g. https://www.youtube.com/watch?v=Z1BCujX3pw8 <br />
					https://vimeo.com/292308505
				</span>
				<Collapse in={!!links.length}>
					<div>
						<h2>Links</h2>
						<div className="content-social-links">
							{links.map((link, key) => (
								<div className="content-social-link" key={key}>
									{
										link.type === 'website' ||
										link.type === 'imdb' ||
										link.type === 'wikipedia' ?
										<span className={`social-icon social-icon--${link.type}`}></span> :
										link.type === 'email' ?
										<i className={`icon icon--mail ion-md-mail`}></i> :
										<i className={`icon icon--${link.type} ion-logo-${link.type}`}></i>
									}
									<a href={link.src} target="_blank" rel="noopener noreferrer">{link.src}</a>
									<button 
										className="content-social-link__remove-btn" 
										type='button' 
										onClick={() => this.removeLink(link.type)} 
									>
										Remove
									</button>
								</div>
							))}
						</div>
					</div>
				</Collapse>
				<ContentModalFooter
					formName={formName}
					content={content}
					nextTab="submitting" />
			</form>
		)
	}
}


const mapStateToProps = state => {
	const { pathname } = state.router.location;
	let content = '',
			formName = '';

	if (pathname.includes(SEARCH_RESULTS.FILMS)) {
		content = SEARCH_RESULTS.FILMS;
		formName = 'newFilmForm';
	} else if (pathname.includes(SEARCH_RESULTS.TALENT)) {
		content = SEARCH_RESULTS.TALENT;
		formName = 'newTalentForm';
	} else if (pathname.includes(SEARCH_RESULTS.FESTS)) {
		content = SEARCH_RESULTS.FESTS;
		formName = 'newFestForm';
	}

	const selector = formValueSelector(formName);
	return {
		socialLinks: selector(state, 'socials') || [],
		formName,
		content
	}
};

const mapDispatchToProps = {
	change
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentSocials);