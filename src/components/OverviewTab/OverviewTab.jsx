import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TabHeading from '../TabHeading/TabHeading';
import FilmCast from '../FilmCast/FilmCast';
import VideosAndPhotos from '../VideosAndPhotos/VideosAndPhotos';
import { FilmographyList } from '../FilmView/FilmView';
import { FestAwardsList } from '../FestView/FestView';
import OverviewTabSideInfo from '../OverviewTabSideInfo/OverviewTabSideInfo';
import { Ads } from '../Ads/Ads';

import adjustLatestAwards from '../LatestAwardsTab/adjustData';

const OverviewMedia = ({ match, media: {videos, images} }) => (
	<div>
		<TabHeading 
			heading={'Videos & Photos'} 
			link={
				(videos.length + images.length) > 4 ? 
				{
					pathname: `${match.url}/media`, 
					state: {
						noScroll: true
					}
				} : null
			}>
			All {videos.length} Videos & {images.length} Photos
		</TabHeading>
		<VideosAndPhotos />
	</div> 
);

const OverviewTab = ({ data, description, biography, filmography, settings, match, location }) => {
	const { awards } = adjustLatestAwards(data);
	const cast = data.credits ? data.credits.cast : [];
	// const { synopsis } = data;
	const media = false || {videos: [], images: []}
	const isMedia = (!!media && !!media.images.length && !!media.videos.length) || true;

	const renderTalentOverview = () => (
		<div>
  		<div>
  			{biography.split('\r\n').map((text, key) => <p key={key}>{text}</p>)}
  			<p>
					<Link 
						to={{
    					pathname: `${match.url}/biography`, 
    					state: { 
    						noScroll: true
  					}}} 
						className="time">See full bio <i className="icon ion-ios-arrow-forward"></i>
					</Link>
				</p>
  		</div>
  		{
  			isMedia &&
  			<OverviewMedia match={match} media={media} />
  		}
  		<div>
				<TabHeading 
  				heading={'Filmography'} 
  				link={{
  					pathname: `${match.url}/filmography`, 
  					state: {
							noScroll: true
						}}}>
  				Filmography
  			</TabHeading>
				<FilmographyList films={filmography} /> 
			</div>
		</div>
	)

	const renderFilmOverview = () => (
		<div>
			<p>{description}</p>
			{
				isMedia &&
  			<OverviewMedia match={match} media={media} />
			}
  		{
  			cast.length ?
	  		<div>
					<TabHeading 
	  				heading={'cast'} 
	  				link={{
	  					pathname: `${match.url}/castcrew`, 
	  					state: {
								noScroll: true
							}}}>
	  				Full Cast & Crew
	  			</TabHeading>
					<FilmCast cast={cast} /> 
				</div> : null
  		}
		</div>
	)

	const renderFestOverview = () => (
		<div>
			<p>{description}</p>
			{
				awards.length ? 
				<div>
					<TabHeading 
	  				heading={'Latest Awards'} 
	  				link={{
	  					pathname: `${match.url}/latestawards`, 
	  					state: {
								noScroll: true
							}}}>
	  				See all Latest awards
	  			</TabHeading>
					<FestAwardsList awards={awards} icon/> 
				</div> : null
			}
			{
  			isMedia &&
  			<OverviewMedia match={match} media={media} />
  		}
		</div>
	);


	return (
		<div id="overview" className="tab overview active">
	    <div className="row">
	    	<div className="col-md-8 col-sm-12 col-xs-12">
		    	{
		    		location.pathname.includes('talent') ? 
		    		renderTalentOverview() : 
		    		location.pathname.includes('film') ? 
		    		renderFilmOverview() : 
		    		location.pathname.includes('festival') ?
		    		renderFestOverview() : null
		    	}

	    	</div>

	    	<div className="col-md-4 col-xs-12 col-sm-12">
	    		<OverviewTabSideInfo data={data} />
	    		<Ads>
						<img src="http://haintheme.com/demo/html/bustter/images/uploads/ads1.png" alt="" />
					</Ads>
	    	</div>

	    </div>
		</div>
	);
}
		

const mapStateToProps = ({ details }) => ({
	data: details.data,
	settings: details.settings
})


export default connect(mapStateToProps, null)(OverviewTab);