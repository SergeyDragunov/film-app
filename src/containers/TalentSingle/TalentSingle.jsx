import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageSingleTabs from '../../components/PageSingleTabs/PageSingleTabs';
import PageSingle from '../../components/PageSingle/PageSingle';
import DetailsMainImage from '../../components/DetailsMainImage/DetailsMainImage';
import { DetailSocialLinks } from '../../components/SocialLinks/SocialLinks';
import SocialButtons from '../../components/SocialButtons/SocialButtons';

import contentActions from '../../actions/content';

import * as mockData from './data';

const tabs = [
	['Overview', ''],
	['Biography','/biography'],
	['Media','/media'],
	['Filmography','/filmography']
];

class TalentSingle extends Component {
	componentDidMount() {
		// const id = this.props.match.params.id;
		// const { getByID } = this.props;

		// getByID('talent', id);
	}

	render() {
		const { location, match, user } = this.props;
		const { media, online } = this.props.data;
		const { name } = mockData;
		const id = match.params.id;
		const headshot = media && media.headshot ? media.headshot.full : '';
		let favorite = false;

		if (user.settings.loggedIn && user.data) {
			favorite = user.data.data.favorites.talent.includes(id);
		}

		const socialLinks = online ? Object.keys(online).map(t =>  online[t] ? [online[t], t] : undefined)
													.filter(s => s) : [];

		return (
			<PageSingle heroType='single' className={'movie-single movie_single cebleb-single'}>
				<PageSingle.Side>
					<DetailsMainImage className="details-main-image--width" image={headshot} title={name} favorite={favorite} />
				</PageSingle.Side>
				<PageSingle.Content>
					<h1 className="bd-hd page-single__title page-single__title--talent">{ name }</h1>
					<p className="ceb-single">Actor  |  Producer</p>
					<DetailSocialLinks socialLinks={socialLinks} />
					<SocialButtons id={id} favorite={favorite} content='talent' />
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
	data: details.data,
	user
});

export default connect(mapStateToProps, mapDispatchToProps)(TalentSingle);