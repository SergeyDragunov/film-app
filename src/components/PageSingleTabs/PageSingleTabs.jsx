import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import OverviewTab from '../OverviewTab/OverviewTab';
import CastAndCrewTab from '../CastAndCrewTab/CastAndCrewTab';
import MediaTab from '../MediaTab/MediaTab';
import AwardsTab from '../AwardsTab/AwardsTab';
import BiographyTab from '../BiographyTab/BiographyTab';
import FilmographyTab from '../FilmographyTab/FilmographyTab';
import RecentAwardsTab from '../RecentAwardsTab/RecentAwardsTab';
import LatestAwardsTab from '../LatestAwardsTab/LatestAwardsTab';
import PastAwardsTab from '../PastAwardsTab/PastAwardsTab';

class PageSingleTabs extends Component {
	render() {
		const { tabs, match, data } = this.props;
		const {
			description, 
			biography, 
			fullBio, 
			filmography
		} = data;
		const locationArr = this.props.location.pathname.split('/').filter(item => !!item);
		const activeTab = locationArr[2] || this.props.tabs[0][1];

		return (
			<div className="movie-tabs">
				<div className="tabs">
					<ul className="tab-links tabs-mv">
						{tabs.map((tab, key) => (
								<li key={key} className={activeTab === tab[1].substring(1) ? 'active' : ''}>
									<Link 
										to={{
											pathname: match.url + tab[1],
											state: {
												noScroll: true
											}
										}}> {tab[0]}</Link></li>
							))}                 
					</ul>
					<div className="tab-content">

						<Route 
							path={`${match.url}`} exact 
							render={props => 
								<OverviewTab
									{...props}
									description={description}
									biography={biography} 
									filmography={filmography} />} />

						<Switch>
							<Route path={`${match.url}/recentawards`} component={RecentAwardsTab} />
							<Route path={`${match.url}/castcrew`} component={CastAndCrewTab} />
							<Route path={`${match.url}/awards`} component={AwardsTab} />
							<Route path={`${match.url}/media`} component={MediaTab} />
							<Route path={`${match.url}/latestawards`} component={LatestAwardsTab} />
							<Route path={`${match.url}/pastawards`} component={PastAwardsTab} />

							<Route 
								path={`${match.url}/biography`} 
								render={props => <BiographyTab fullBio={fullBio}/>} />
							<Route 
								path={`${match.url}/filmography`} 
								render={props => <FilmographyTab filmography={filmography} />} />
						</Switch>
					</div>
				</div>
			</div>
		)
	}
}

export default PageSingleTabs;