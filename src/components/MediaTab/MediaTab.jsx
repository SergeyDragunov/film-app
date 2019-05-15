import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import ModalVideo from 'react-modal-video';
import ScrollLock from 'react-scrolllock';

import '../../../node_modules/react-modal-video/css/modal-video.min.css';

import { PhotoList, VideoList } from '../MediaView/MediaView';
import TabHeading from '../TabHeading/TabHeading';

const images = [
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image11.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image21.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image11.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image21.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image11.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image21.jpg'},
	{src: 'http://haintheme.com/demo/html/bustter/images/uploads/image11.jpg'}
];

const videos = [
	{src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'},
	{src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'},
	{src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'},
	{src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'},
	{src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'},
	{src: "https://www.youtube.com/embed/o-0hcF97wy0", id: 'o-0hcF97wy0'}
];

class MediaTab extends Component {
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
		const { title, name } = this.props.data;
		const heading = title ? title : name;

		return (
			<div id="media" className="tab active">
    		<div className="rv-hd">
      		<div>
      			<h3>Videos & Photos of</h3>
	 					<h2>{ heading }</h2>
      		</div>
      	</div>

      	<div>
	      	<TabHeading heading={'Videos'} count={videos.length} />
	      	<VideoList videos={videos} openModal={this.openModal} responsive />
	      	<ModalVideo 
	      		isOpen={this.state.isModalOpen}
	      		videoId={this.state.videoId}
	      		onClose={() => this.setState({isModalOpen: false, videoId: ''})}/>
      		{this.state.isModalOpen && <ScrollLock />}
      	</div>

      	<div>
					<TabHeading heading={'Photos'} count={images.length} />
					<PhotoList images={images} openLightbox={this.openLightbox} responsive />
					<Lightbox 
						images={images}
						backdropClosesModal={true}
						isOpen={this.state.isLightboxOpen}
						currentImage={this.state.currentImage}
						onClickPrev={() => this.gotoPrevious()}
						onClickNext={() => this.gotoNext()}
						onClose={() => this.setState({isLightboxOpen: false, currentImage: 0})}/>
      	</div>
   	 	</div>
		)
	}
}

const mapStateToProps = ({ details }) => ({
	data: details.data
});

export default connect(mapStateToProps, null)(MediaTab);