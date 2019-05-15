import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageSingleTabs from '../../components/PageSingleTabs/PageSingleTabs';
import PageSingle from '../../components/PageSingle/PageSingle';
import DetailsMainImage from '../../components/DetailsMainImage/DetailsMainImage';
import SocialButtons from '../../components/SocialButtons/SocialButtons';

import contentActions from '../../actions/content';

import * as data from './data';

class FestSingle extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		const { getByID } = this.props;

		getByID('festival', id);
	}

	setTabs() {
		const { data } = this.props;
		let tabs = [
				['Overview', ''],
				['Media','/media']
			];

		if(Object.keys(data).length) {
			if(this.festYearsCnt(data) >= 1) tabs.push(['Latest Awards','/latestawards'])
			if(this.festYearsCnt(data) > 1) tabs.push(['Past Awards','/pastawards'])
		}

		return tabs;
	}

	festYearsCnt(data) {
		let years = {};
		for (let key in data) {
			if (/\d+/.test(key) && Object.keys(data[key]).length) {
				years[key] = data[key];
			}
		}

		for(let key in years) {
			if (!years[key].start_date || !years[key].end_date || !years[key].awards.length) delete years[key]
		}
		return Object.keys(years).length;
	}

	render() {
		const { location, match, user } = this.props;
		const { name, media } = this.props.data;
		const tabs = this.setTabs();
		const id = match.params.id;
		const festPoster = media && media.festivalPoster ? media.festivalPoster.full : '';
		let favorite = false;

		if (user.settings.loggedIn && user.data) {
			favorite = user.data.data.favorites.festivals.includes(id);
		}

		return (
			<PageSingle heroType='single' className={'movie-single movie_single'}>
				<PageSingle.Side>
					<DetailsMainImage className="details-main-image--width" image={festPoster} title={name} favorite={favorite} />
				</PageSingle.Side>
				<PageSingle.Content>
					<h1 className="bd-hd page-single__title">{name}</h1>
					<SocialButtons id={id} favorite={favorite} content='festival' />
					<PageSingleTabs 
						tabs={tabs} 
						match={match} 
						location={location}
						data={data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FestSingle);