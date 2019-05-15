import React, { Component } from 'react';

import TrailerUpload from '../TrailerUpload/TrailerUpload'; 
import VideosUpload from '../VideosUpload/VideosUpload'; 
// import ImagesUpload from '../ImagesUpload/ImagesUpload'; 
import { SEARCH_RESULTS } from '../../constants';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';

import './style.css';

class ContentMedia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: SEARCH_RESULTS.FILMS,
			formName: 'newFilmForm'
		};
	} 

	componentDidMount() {
		const { pathname } =  this.props.location;
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

		this.setState({content, formName});
	}

	render() {
		const  { content, formName } = this.state;
		return (
			<div>
				{(content === SEARCH_RESULTS.FILMS) && <TrailerUpload />}
				<VideosUpload />
				{/*<ImagesUpload />*/}
				<ContentModalFooter
					formName={formName}
					content={content}
					nextTab="social" />
			</div>
		)
	}
}

export default ContentMedia;