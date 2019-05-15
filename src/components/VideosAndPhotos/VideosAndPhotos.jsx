import React, { Component } from 'react';
import Lightbox from 'react-images';
import ModalVideo from 'react-modal-video';
import ScrollLock from 'react-scrolllock';

import { Photo, Video } from '../MediaView/MediaView';

import './style.css';

const images = [
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image11.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image21.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image11.jpg'}
];

const video = {src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'};

class VideosAndPhotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLightboxOpen: false,
			currentImage: 0,
			isModalOpen: false,
			videoId: ''
		}

		this.openLightbox = this.openLightbox.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	openLightbox(e, curImage) {
		e.preventDefault();
		this.setState({isLightboxOpen: true, currentImage: curImage});
	}

	openModal(e, videoId) {
		e.preventDefault();
		this.setState({isModalOpen: true, videoId});
	}

	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

	render() {
		return (
			<div className="VideosAndPhotos">
				{images.map((image, key) => 
					<Photo key={key} image={image} imageId={key} openLightbox={this.openLightbox}/>
				)}
				<Video small video={video} openModal={this.openModal} className="media-video--small"/>
				
				<ModalVideo 
	      		isOpen={this.state.isModalOpen}
	      		videoId={this.state.videoId}
	      		onClose={() => this.setState({isModalOpen: false, videoId: ''})}/>
    		{this.state.isModalOpen && <ScrollLock />}
				<Lightbox 
						backdropClosesModal={true}
						images={images}
						isOpen={this.state.isLightboxOpen}
						currentImage={this.state.currentImage}
						onClickPrev={() => this.gotoPrevious()}
						onClickNext={() => this.gotoNext()}
						onClose={() => this.setState({isLightboxOpen: false, currentImage: 0})}/>
			</div>
		)
	}
};

export default VideosAndPhotos;