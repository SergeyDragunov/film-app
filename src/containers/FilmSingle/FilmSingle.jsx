import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import ModalVideo from 'react-modal-video';
import ScrollLock from 'react-scrolllock';

import PageSingleTabs from '../../components/PageSingleTabs/PageSingleTabs';
import PageSingle from '../../components/PageSingle/PageSingle';
import FilmImage from '../../components/FilmImage/FilmImage';
import { DetailSocialLinks } from '../../components/SocialLinks/SocialLinks';
import SocialButtons from '../../components/SocialButtons/SocialButtons';

import contentActions from '../../actions/content';

import adjustData from './adjustData';
import * as mockData from './data';

class FilmSingle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
			isSticky: window.innerWidth > 992
		}

		this.openModal = this.openModal.bind(this);
		this.setSticky = this.setSticky.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		const { getByID } = this.props;

		getByID('movie', id);

		window.addEventListener('resize', this.setSticky);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setSticky);
	}

	openModal(e, videoId) {
		e.preventDefault();
		this.setState({isModalOpen: true, videoId});
	}

	setSticky() {
		if (window.innerWidth < 992 && this.state.isSticky ) {
			this.setState({ isSticky: false });
		} else if (window.innerWidth > 992) {
			this.setState({ isSticky: true });
		}
	}

	setTabs() {
		const { data } = this.props;
		let tabs = [
				['Overview', ''],
				['Recent Awards', '/recentawards'],
				// ['Cast & Crew','/castcrew'],
				// ['Media','/media'],
				['Awards','/awards']
			];

		if(Object.keys(data).length) {
			if (this.checkForCredits(data)) 
				tabs.push(['Cast & Crew','/castcrew']);
			if (data.media && data.media.images.length && data.media.videos.length) 
				tabs.push(['Media','/media']);
		}

		return tabs;
	}

	checkForCredits(data) {
		let isCredits = false;
		for (let key in data.credits) {
			if (data.credits[key].length) isCredits = true;
		}

		return isCredits;
	}

	render() {
		const { isFetching } = this.props.settings;
		const { location, match, user } = this.props;
		const id = match.params.id;
		const trailerId = 'o-0hcF97wy0';
		const { title, year, online } = this.props.data;
		const tabs = this.setTabs();

		let favorite = false;

		if (user.settings.loggedIn && user.data) {
			favorite = user.data.data.favorites.films.includes(id);
		}

		const socialLinks = online ? 
			Object.keys(online).map(t =>  online[t] ? [online[t], t] : undefined)
				.filter(s => s) : [];

		return (
			<PageSingle 
				heroType='single' 
				isSticky={this.state.isSticky} 
				className={'movie-single movie_single'}>
				<PageSingle.Side>
					{
						this.state.isSticky && !isFetching ? 
						<StickyContainer style={{height: '100%'}}>
							<Sticky topOffset={-80} >
								{({ style, distanceFromBottom, isSticky }) => (
										<FilmImage 
											favorite={favorite}
											style={style}
											distanceFromBottom={distanceFromBottom}
											openModal={this.openModal}
											isSticky={isSticky}/>
								)}
							</Sticky>
						</StickyContainer> :
						<FilmImage favorite={favorite} openModal={this.openModal} />
					}

					<ModalVideo 
	      		isOpen={this.state.isModalOpen}
	      		videoId={trailerId}
	      		onClose={() => this.setState({isModalOpen: false})}/>

	      	{this.state.isModalOpen && <ScrollLock />}
				</PageSingle.Side>
				<PageSingle.Content>
					<h1 className="bd-hd page-single__title">{title} <span>{year}</span></h1>
					{!!socialLinks.length && <DetailSocialLinks socialLinks={socialLinks} />}
					<SocialButtons id={id} favorite={favorite} content='film' />
					<PageSingleTabs 
						tabs={tabs} 
						match={match} 
						location={location}
						data={mockData} />
				</PageSingle.Content>
			</PageSingle>
		)
	}
}

const mapDispatchToProps = {
	getByID: contentActions.getByID
};

const mapStateToProps = ({ details, user }) => ({
	settings: details.settings,
	data: Object.keys(details.data).length ? adjustData(details.data) : {},
	user
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmSingle);