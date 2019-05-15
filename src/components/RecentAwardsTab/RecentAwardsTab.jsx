import React, { Component } from 'react';

import TabHeading from '../TabHeading/TabHeading';
import { FestAwardsList } from '../FestView/FestView';

import { SINGLE_PAGE } from '../../constants';

export const awards = [
	{
		type: 'award',
		title: 'Best Actor',
		recipient: 'Tom Hardy'
	},
	{
		type: 'nomination',
		title: 'Best Director',
		recipient: 'Tom Hardy'
	},
	{
		type: 'nomination',
		title: 'Best Short Film',
		recipient: 'Tom Hardy'
	},
	{
		type: 'award',
		title: 'Best Drama',
		recipient: 'Tom Hardy'
	},
	{
		type: 'honorable',
		title: 'Best Animation',
		recipient: 'Tom Hardy'
	},
	{
		type: 'honorable',
		title: 'Best Documentrary',
		recipient: 'Tom Hardy'
	}
];

const festivals = [
	{
		title: 'Festival 1',
		awards: awards
	},
	{
		title: 'Festival 2',
		awards: awards
	},
	{
		title: 'Festival 3',
		awards: awards
	},
];

class RecentAwardsTab extends Component {
	render() {
		return (
			<div id="overview" className="tab overview active">
				<p>Tony Stark creates the Ultron Program to protect the world, but when the peacekeeping program becomes hostile, The Avengers go into action to try and defeat a virtually impossible enemy together. Earth's mightiest heroes must come together once again to protect the world from global extinction.</p> 

				<div>
					{festivals.map((festival, key) => 
						<div key={key}>
							<TabHeading heading={festival.title} link={`/${SINGLE_PAGE.FILM}/awards`}>See All Awards</TabHeading>
							<FestAwardsList awards={festival.awards} icon={true} />
						</div>
					)}
				</div>

			</div>
		);
	}
}

export default RecentAwardsTab;