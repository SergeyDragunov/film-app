import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import Dropzone from 'react-dropzone';
import Lightbox from 'react-images';

import { Photo } from '../MediaView/MediaView';
import { SEARCH_RESULTS } from '../../constants'; 

import './style.css';

class ImagesUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLightboxOpen: false,
			currentImage: 0
		}

		this.openLightbox = this.openLightbox.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}

	openLightbox(e, curImage) {
		e.preventDefault();
		this.setState({isLightboxOpen: true, currentImage: curImage});
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

	onDrop(files) {
		if (files.length) {
		  files.forEach(file => {
				const reader = new FileReader();
			 	reader.readAsDataURL(file);
				reader.onloadend = () => {
					this.props.change(this.props.formName, 'images', [...this.props.images, {src: reader.result}]);
				}
			});
		}
  }

  deleteImage(i, e) {
  	e.preventDefault();
  	e.stopPropagation();
  	let images = [...this.props.images];
  	images.splice(i, 1);
  	this.props.change(this.props.formName, 'images', images);
  }

	render() {
		const { images } = this.props;
		const { isLightboxOpen, currentImage } = this.state;

		return (
			<div>
				<h2 className="content-media__heading">Images</h2>
				<div className="content-images-upload">
					{images.map((image, key) => (
						<Photo 
							dataId={key}
							key={key} 
							image={image} 
							imageId={key} 
							openLightbox={this.openLightbox}
							handleDelete={this.deleteImage}
						/>
					))}
					<Dropzone 
						accept="image/jpeg, image/png"
						activeClassName='active-drag'
						className="dropzone"
						onDrop={this.onDrop}
					>
						<span className="dropzone__icon"></span>
						<span className="dropzone__text">Drag or Click</span>
					</Dropzone>
				</div>
				<Lightbox 
					images={images}
					backdropClosesModal={true}
					isOpen={isLightboxOpen}
					currentImage={currentImage}
					onClickPrev={() => this.gotoPrevious()}
					onClickNext={() => this.gotoNext()}
					onClose={() => this.setState({isLightboxOpen: false, currentImage: 0})}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { pathname } = state.router.location;
	// let content = ''
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
		images: selector(state, 'images') || [],
		formName
	}
};

const mapDispatchToProps = {
	change
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesUpload);