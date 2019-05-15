import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import { Collapse } from 'react-bootstrap';

import { YouTubeGetID } from '../../utils';

class TrailerUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trailerLoaded: false,
			inputTrailer: '',
			error: ''
		};

		this.handleUploadTrailer = this.handleUploadTrailer.bind(this);
		this.removeTrailer = this.removeTrailer.bind(this);
	} 

	handleUploadTrailer() {
		const { inputTrailer } = this.state;
		this.setState({error: ''})
		if(inputTrailer.includes('youtube')) {
			const id = YouTubeGetID(inputTrailer);
			if (typeof id === 'string') {
				const trailer = `https://www.youtube.com/embed/${id}`;
				this.props.change('newFilmForm', 'trailer', trailer);
			} else {
				this.setState({error: 'Please, Insert Proper Link'})
			}
		} else if (inputTrailer.includes('vimeo')) {
			const id = inputTrailer.split('/')[inputTrailer.split('/').length - 1];
			const trailer =  `https://player.vimeo.com/video/${id}`;
			this.props.change('newFilmForm', 'trailer', trailer);
		} else {
			this.setState({error: 'Please, Insert Proper Link'})
		}
	}

	removeTrailer() {
		this.props.change('newFilmForm', 'trailer', '');
	}

	render() {
		const { inputTrailer, error, trailerLoaded } = this.state;
		const { trailer } = this.props;

		return (
			<div className="content-media">
				<h2 className="content-media__heading content-media__heading--margin0">Trailer</h2>
				<Collapse in={!!trailer} className="content-media__collapse">
					<div>
						<div className="content-media__trailer">
							<iframe 
								className={!trailerLoaded ? 'loading-bg' : ''}
								onLoad={() => this.setState({trailerLoaded: true})}
								title='Trailer'
								src={trailer}
								frameBorder="0"></iframe>
						</div>
					</div>
				</Collapse>

				<div className="content-media__input-wrapper">
					<span className="content-media__help-text">
						E.g. https://www.youtube.com/watch?v=Z1BCujX3pw8 <br />
						https://vimeo.com/292308505
					</span>
					<div className="content-media__form-group form-group form-group--marginBottom0">
						<label htmlFor="inputTrailer" className="sr-only">Trailer Link</label>
						<input
							id='inputTrailer'
							value={inputTrailer}
							onKeyPress={e => {if(e.key === 'Enter') e.preventDefault()}}
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
						Upload
					</button>
				</div>
				{
					!!trailer &&
					<button 
						type='button'
						className='content-media__remove-trailer-btn'
						onClick={this.removeTrailer}
					>
						Remove Trailer
					</button>
				}
			</div>
		)
	}
}

const selector = formValueSelector('newFilmForm');
const mapStateToProps = state => ({
	trailer: selector(state, 'trailer') || ''
});

const mapDispatchToProps = {
	change
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailerUpload);