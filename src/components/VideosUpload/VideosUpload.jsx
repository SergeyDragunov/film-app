import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import ModalVideo from 'react-modal-video';
import ScrollLock from 'react-scrolllock';

import { SEARCH_RESULTS } from '../../constants'; 
import { VideoList } from '../MediaView/MediaView';

import { YouTubeGetID } from '../../utils';

class VideosUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			videoId: '',
			inputTrailer: '',
			error: '',
			channel: ''
		};

		this.handleUploadTrailer = this.handleUploadTrailer.bind(this);
		this.openModal = this.openModal.bind(this);
		this.deleteVideo = this.deleteVideo.bind(this);
	} 

	handleUploadTrailer() {
		const { change, formName } = this.props;
		const { inputTrailer } = this.state;
		this.setState({error: ''})
		if (inputTrailer.includes('youtube')) {
			const id = YouTubeGetID(inputTrailer);
			if (id) {
				let newVideos = [...this.props.videos];
				change(formName, 'videos', newVideos);
				newVideos.push({src: `https://www.youtube.com/embed/${id}`, id, channel: 'youtube'});
				this.setState({inputTrailer: ''});
			} else {
				this.setState({error: 'Please Insert Proper Link'})
			}
		} else if (inputTrailer.includes('vimeo')) {
			const id = inputTrailer.split('/')[inputTrailer.split('/').length - 1].trim();
			if (id) {
				let newVideos = [...this.props.videos];
				newVideos.push({src: `https://player.vimeo.com/video/${id}`, id, channel: 'vimeo'});
				change(formName, 'videos', newVideos);
				this.setState({inputTrailer: ''});
			} else {
				this.setState({error: 'Please Insert Proper Link'})
			}
		} else {
			this.setState({error: 'Please Insert Proper Link'})
		}
	}

	openModal(e, videoId, channel) {
		e.preventDefault();
		this.setState({isModalOpen: true, videoId, channel});
	}

	deleteVideo(i, e) {
  	let videos = [...this.props.videos];
  	videos.splice(i, 1);
		this.props.change(this.props.formName, 'videos', videos);
  }

	render() {
		const { inputTrailer, error, isModalOpen, videoId, channel } = this.state;
		const { videos } = this.props;

		return (
			<div className="content-media">
				<h2 className="content-media__heading">Videos</h2>
				<div className="content-media__videos">
					{
						!!videos.length &&
						<VideoList 
							openModal={this.openModal} 
							videos={videos} 
							handleDelete={this.deleteVideo} 
							videoClassName="media-video--submit" />
					}
					<ModalVideo 
						channel={channel}
	      		isOpen={isModalOpen}
	      		videoId={videoId}
	      		onClose={() => this.setState({isModalOpen: false, videoId: ''})}/>
	    		{isModalOpen && <ScrollLock />}
				</div>
				<div className="content-media__input-wrapper">
					<span className="content-media__help-text">
						E.g. https://www.youtube.com/watch?v=Z1BCujX3pw8<br />
						https://vimeo.com/292308505
					</span>
					<div className="content-media__form-group form-group form-group--marginBottom0">
						<label htmlFor="video-src" className="sr-only">Video Links</label>
						<input
							id='video-src'
							value={inputTrailer}
							onKeyPress={e => {if (e.key === 'Enter') e.preventDefault()}}
							onChange={e => this.setState({inputTrailer: e.target.value})}
			        name="trailer"
			        type="text"
			        placeholder="Place YouTube or Vimeo Link"
			      />
			      {
			      	error && <span className="error-msg">{ error }</span>
			      }
					</div>
					
					<button 
						disabled={!inputTrailer.length}
						type='button'
						className="content-media__upload-btn modal__btn modal__btn--inline"
						onClick={this.handleUploadTrailer}
					>
						Add
					</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { pathname } = state.router.location;
	// let content = '',
	let formName = '';

	if (pathname.includes(SEARCH_RESULTS.FILMS)) {
		// content = SEARCH_RESULTS.FILMS;
		formName = 'newFilmForm';
	} else if (pathname.includes(SEARCH_RESULTS.TALENT)) {
		// content = SEARCH_RESULTS.TALENT;
		formName = 'newTalentForm';
	} else if (pathname.includes(SEARCH_RESULTS.FESTS)) {
		// content = SEARCH_RESULTS.FESTS;
		formName = 'newFestForm';
	}

	const selector = formValueSelector(formName);
	return {
		videos: selector(state, 'videos') || [],
		formName
	}
};

const mapDispatchToProps = {
	change
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosUpload);