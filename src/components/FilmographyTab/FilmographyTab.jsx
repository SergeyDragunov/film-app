import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TopbarSortFilter } from '../TopbarFilter/TopbarFilter';
import { FilmographyList } from '../FilmView/FilmView';

class FilmographyTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSorting: 'DATE_UP'
		}

		this.handleSortingSelectChange = this.handleSortingSelectChange.bind(this);
	}

	handleSortingSelectChange(e) {
		this.setState({activeSorting: e.target.value})
	}

	render() {
		const { filmography, data } = this.props;
		const { name } = data;

		return (
			<div id="filmography" className="tab active">

      	<div className="rv-hd">
      		<div>
      			<h3>Biography of</h3>
	 					<h2>{name}</h2>
      		</div>
      	</div>

      	<TopbarSortFilter 
      		type={'Films'}
      		dataLength={filmography.length}
      		activeSorting={this.state.activeSorting}
      		handleChange={this.handleSortingSelectChange}/>

				<FilmographyList films={filmography} />
   	 	</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		data: state.details.data
	}
}

export default connect(mapStateToProps, null)(FilmographyTab);