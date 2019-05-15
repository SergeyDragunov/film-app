import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PanelGroup, Panel  } from 'react-bootstrap';

import { FestAwardsList } from '../FestView/FestView';
import TabHeading from '../TabHeading/TabHeading';

import adjustData from './adjustData'; 

class AwardsPanels extends Component {	
	render() {
		const { awards, year, dataKey } = this.props;
		return (
			<Panel className='festival-panel' eventKey={dataKey} >
				<Panel.Heading className='festival-panel__heading'>
					<Panel.Title toggle className='festival-panel__toggle'>Year {year}</Panel.Title>
				</Panel.Heading>
				<Panel.Body collapsible className='festival-panel__body'>
					<div>
						{
			 				awards.awards.length ?
				 			<div>
					 			<TabHeading heading={'Awards'} icon={'award'} />
					    	<FestAwardsList awards={awards.awards} />
				 			</div> :
				 			null
			 			}
			 			{
			 				awards.nominations.length ? 
				 			<div>
					 			<TabHeading heading={'Nominations'} icon={'nomination'} />
					    	<FestAwardsList awards={awards.nominations} />
				 			</div> :
				 			null
			 			}
			 			{
			 				awards.mentions.length ? 
				 			<div>
					 			<TabHeading heading={'Honorable mentions'} icon={'honorable'} />
					    	<FestAwardsList awards={awards.mentions} />
				 			</div> :
				 			null	 				
			 			}
					</div>
				</Panel.Body>
			</Panel>
		)
	}
}

class PastAwardsTab extends Component {
	render() {
		const years = adjustData(this.props.data);
		return (
			<div className="tab active">
	 			<h3>Festival's</h3>
	 			<h2>Past Awards</h2>

	 			<PanelGroup accordion id="accordion-example" className='festival-accordinon'>
	 				{Object.keys(years).map((year, key) => <AwardsPanels year={year} awards={years[year]} key={key} dataKey={key} />)}
	 			</PanelGroup>
 			</div>
		)
	}
}

const mapStateToProps = ({ details }) => ({
	data: details.data
});

export default connect(mapStateToProps, null)(PastAwardsTab);