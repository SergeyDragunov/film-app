import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FestAwardsList } from '../FestView/FestView';
import TabHeading from '../TabHeading/TabHeading'

import adjustData from './adjustData'; 

class LatestAwardsTab extends Component {
	render() {
		const { year, start_date, end_date, awards, nominations, mentions } = adjustData(this.props.data);

		return (
			<div className="tab active">
	 			<h3>{year} Awards</h3>
	 			{
	 				start_date === end_date ? 
	 				<h2>{start_date}</h2> : 
	 				<h2>{start_date} - {end_date} </h2>
	 			}
	 			
	 			{
	 				awards.length ?
		 			<div>
			 			<TabHeading heading={'Awards'} icon={'award'} />
			    	<FestAwardsList awards={awards} />
		 			</div> :
		 			null
	 			}
	 			{
	 				nominations.length ? 
		 			<div>
			 			<TabHeading heading={'Nominations'} icon={'nomination'} />
			    	<FestAwardsList awards={nominations} />
		 			</div> :
		 			null
	 			}
	 			{
	 				mentions.length ? 
		 			<div>
			 			<TabHeading heading={'Honorable mentions'} icon={'honorable'} />
			    	<FestAwardsList awards={mentions} />
		 			</div> :
		 			null	 				
	 			}
 			</div>
		)
	}
}

const mapStateToProps = ({ details }) => ({
	data: details.data
});

export default connect(mapStateToProps, null)(LatestAwardsTab);