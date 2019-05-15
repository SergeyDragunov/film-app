import React, { Component } from 'react';
import { connect } from 'react-redux';

import DetailsMainImage from '../DetailsMainImage/DetailsMainImage';

import './style.css';

class FilmImage extends Component {
	render() {
		const { title, media } = this.props.data;
		const { distanceFromBottom, isSticky, favorite } = this.props;
		let style = {};
		if (!!distanceFromBottom && isSticky) {
			style = {
				...this.props.style,
				top: distanceFromBottom  < 0 ? this.props.style.top + 80 : 80
			}
		}
		const poster = media && media.moviePoster ? media.moviePoster.full : '';
		// const trailer = media && media.trailer;

		return (
			<div className={`film-poster movie-img ${!distanceFromBottom ? 'sticky-sb' : ''}`} style={style}>
				<DetailsMainImage className="details-main-image--film" image={poster} title={title} favorite={favorite} />
				{
					true &&
					<div className="film-poster__controls movie-btn">	
						<div className="film-poster__btn-wrapper btn-transform transform-vertical red" onClick={this.props.openModal}>
							<div>
								<a href="https://www.youtube.com/embed/o-0hcF97wy0" tabIndex='-1'  className="item item-1 redbtn"> <i className="icon ion-md-play"></i> Watch Trailer</a>
							</div>
							<div>
								<a href="https://www.youtube.com/embed/o-0hcF97wy0" className="item item-2 redbtn fancybox-media hvr-grow"><i className="icon ion-md-play"></i></a>
							</div>
						</div>

						{/*<div className="btn-transform transform-vertical">
							<div><a  className="item item-1 yellowbtn"> <i className="ion-card"></i> Buy ticket</a></div>
							<div><a  className="item item-2 yellowbtn"><i className="ion-card"></i></a></div>
						</div>*/}
					</div>
				}
			</div>
		)
	}
};

const mapStateToProps = ({ details }) => ({
	data: details.data
})

export default connect(mapStateToProps, null)(FilmImage);