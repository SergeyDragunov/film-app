import React, { Component } from 'react';
import { connect } from 'react-redux';

// import castPhoto from '../../assets/images/uploads/cast1.jpg';
// import { movieCast, director, directorsWriters, producers } from './data.js';

import FilmCast from '../FilmCast/FilmCast';
import TabHeading from '../TabHeading/TabHeading';


class CastAndCrewTab extends Component {
	render() {
		const { title } = this.props.data;
		const credits = this.props.data.credits ? this.props.data.credits : null;

		return (
			<div id="cast" className="tab active">
      	<h3>Cast & Crew of</h3>
 	 			<h2>{ title }</h2>

 	 			{
 	 				credits ? 
 	 				Object.keys(credits).map((title, key) => (
 	 					credits[title].length ? 
 	 					<div key={key}>
		 	 				<TabHeading heading={title} />
							<FilmCast cast={credits[title]} />
						</div> : null
 	 				)) : null
 	 			}
   	 	</div>
		)
	}
}

const mapStateToProps = ({ details }) => ({
	data: details.data
});

export default connect(mapStateToProps, null)(CastAndCrewTab);