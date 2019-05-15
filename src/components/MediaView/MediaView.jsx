import React from 'react';

import './style.css';

export const Photo = ({ openLightbox, image, imageId, handleDelete, dataId, responsive }) => (
	<div className={`media-photo ${responsive ? 'media-photo--responsive' : ''}`}>
		<a 
			className="media-photo__img-wrapper"  
			data-fancybox-group="gallery" 
			href="images/uploads/image11.jpg" 
			onClick={(e) => openLightbox(e, imageId)}
		>
			{handleDelete && <button onClick={e => handleDelete(dataId, e)} className="media-photo__remove-btn"></button>}
			<img className='media-photo__img' src={image.src} alt=""/>
		</a>
	</div>
)

export const PhotoList = ({ openLightbox, images, responsive }) => (
	<div className="photo-gallery">
		{images.map((image, key) => (
			<Photo key={key} image={image} imageId={key} openLightbox={openLightbox} responsive />
		))}
	</div>
);

export const Video = ({ video, openModal, handleDelete, dataId, className, small, responsive }) => (
	<div className={"media-video " + (className ? className : '') + (responsive ? ' media-video--responsive' : '')}>
		{handleDelete && <button onClick={e => handleDelete(dataId, e)} className="media-video__remove-btn"></button>}
		<div className="media-video__img-wrapper">
			<a 
				className="media-video__img-fancybox"  
				href={video.src}
				onClick={(e) => openModal(e, video.id, video.channel)}
			>
				<img className="media-video__img" src="http://haintheme.com/demo/html/bustter/images/uploads/vd-item2.jpg" alt=""/>
			</a>
		</div>
		{
			!small &&
			<div className="media-video__info">
				<h6 className="media-video__title"> <a href={video.src} onClick={(e) => openModal(e, video.id, video.channel)}>Trailer:  Watch New Scenes</a></h6>
				<span className="media-video__time"> 1: 31</span>
			</div>
		}
	</div>
);

export const VideoList = ({ openModal, videos, handleDelete, videoClassName, responsive }) => (
	<div className="media-videos-container">
		{videos.map((video, key) => (
				<Video 
					responsive
					className={videoClassName}
					key={key} 
					video={video} 
					openModal={openModal} 
					dataId={key} 
					handleDelete={handleDelete} />
			))}
	</div>
);