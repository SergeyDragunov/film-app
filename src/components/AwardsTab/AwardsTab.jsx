import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-bootstrap';

import data from './data';
import { scrollToStart } from '../../utils';
import { AFTER_FADE_DURATION } from '../../constants'
import { TopbarSortFilter, TopbarPageFilter } from '../TopbarFilter/TopbarFilter';
import { FestSlider } from '../FestView/FestView';

const sorting = [
	{
		value: 'DATE_DOWN',
		type: 'Release date Descending'
	},
	{
		value: 'DATE_UP',
		type: 'Release date Ascending'
	},
];

class AwardsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemsPerPage: 5,
			activePage: 1,
			pagesCnt: Math.ceil(data.length / 5),
			activeSorting: 'DATE_DOWN',
			isFaded: true
		}

		this.handlePageSelectChange = this.handlePageSelectChange.bind(this);
		this.handleSortingSelectChange = this.handleSortingSelectChange.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(page) {
		scrollToStart('.tab-content');
		this.setState({isFaded: false});
		setTimeout(() => {
		this.setState({activePage: page, isFaded: true});
		}, AFTER_FADE_DURATION);
	}

	handlePageSelectChange(e) {
		scrollToStart('.tab-content');
		const value = +e.target.value;
		this.setState({isFaded: false})
		setTimeout(() => {
			this.setState({
				pagesCnt: Math.ceil(data.length / value),
				itemsPerPage: value,
				activePage: 1,
				isFaded: true
			});
		}, AFTER_FADE_DURATION);
	}

	handleSortingSelectChange(e) {
		const value = e.target.value;
		this.setState({isFaded: false})
		setTimeout(() => {
			this.setState({activeSorting: value, isFaded: true})
		}, AFTER_FADE_DURATION);
	}

	sortData() {
		const { activePage, itemsPerPage, activeSorting } = this.state;

		let sortedData = [];
		const selectionEnd = itemsPerPage * activePage;
		const selectionStart = selectionEnd - itemsPerPage;
		
		switch(activeSorting) {
			case 'DATE_UP': {
				data.sort((a, b) => a.year - b.year );
				break;
			}
			case 'DATE_DOWN': {
				data.sort((a, b) => b.year - a.year );
				break;
			}
			default: {
			}
		}

		for(let i = selectionStart; i < selectionEnd; i++) {
			if(data[i]) sortedData.push(data[i]);
		}

		return sortedData;
	}

	render() {
		const fests = this.sortData();
		const { title } = this.props.data;

		return (
			<div id="moviesrelated" className="tab active">
	 			<h3>Awards For</h3>
	 			<h2>{ title }</h2>

	 			<TopbarSortFilter 
      		type={'Awards'}
      		sortingTypes={sorting}
      		dataLength={data.length}
      		activeSorting={this.state.activeSorting}
      		handleChange={this.handleSortingSelectChange}/>

      	<Fade in={this.state.isFaded}>
      		<div>
						{fests.map((fest, key) => <FestSlider key={key} fest={fest} />)}
					</div>
      	</Fade>

				<TopbarPageFilter 
					type={'Awards'}
					options={[5,10]}
					pagesCnt={this.state.pagesCnt}
					activePage={this.state.activePage}
					selectPage={this.selectPage}
					nextPage={this.nextPage}
					prevPage={this.prevPage}
					handlePageChange={this.handlePageChange}
					handleChange={this.handlePageSelectChange}/>
 			</div>
		)
	}
}

const mapStateToProps = ({ details }) => ({
	data: details.data
});

export default connect(mapStateToProps, null)(AwardsTab);