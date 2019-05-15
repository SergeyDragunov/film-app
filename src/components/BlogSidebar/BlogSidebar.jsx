import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import BlogTags from '../../components/BlogTags/BlogTags';
import BlogCategories from '../../components/BlogCategories/BlogCategories';
import { FilterRadio }  from '../../components/SearchFormInputs/SearchFormInputs';

let popularArticles = ['Korea Box Office: Beauty and the Beast Wins Fourth', 'Homeland Finale Includes Shocking Death', 'Fate of the Furious Reviews What the Critics Saying'];

const BlogPopular = () => (
	<div className="sb-recentpost sb-it">
		<h4 className="sb-title">most popular</h4>
		{popularArticles.map((title, i) => (
			<div className="recent-item" key={i}>
				<span>{i + 1 < 10 ? `0${i + 1}` : i + 1}</span><h6><Link to="/spotlight/s0600001">{title}</Link></h6>
			</div>
		))}
	</div>
);

class BlogSidebar extends Component {
	constructor(props) {
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		if (e.key === 'Enter') {
			const { location, push } = this.props;
			const title = e.target.value;

			let search;
			if(location.search) {
				const filters = qs.parse(location.search, {arrayFormat: 'bracket'});
				filters.title = title.toLowerCase();
				const qsFilters = qs.stringify(filters, {arrayFormat: 'bracket'});
				search = `?${qsFilters}`;
			} else {
				search = `?title=${title.toLowerCase()}`
			}

			push({
				pathname: '/spotlight',
				search,
				state: window.innerWidth > 991 ? {noScroll: true} : undefined
			});
		}
	}

	render() {
		const { toggleView, location, category, tags, history, view, changeView } = this.props;

		return (
			<div className="sidebar">

				<div className="sb-search sb-it">
					<h4 className="sb-title">Search</h4>
					<input 
						type="text" 
						placeholder='Press "Enter" to search'
						onKeyPress={this.handleSearch} />
				</div>

				{
					toggleView && 
					<div className="sb-search sb-it">
						<h4 className="sb-title">View</h4>
						<div className="filter-radio-wrapper">
							<FilterRadio 
								id="grid-view" 
								name="view" 
								checked={view === 'GRID'} 
								value="GRID" 
								label="Grid" 
								handleChange={changeView} />
							<FilterRadio 
								id="list-view" 
								name="view" 
								checked={view === 'LIST'} 
								value="LIST" 
								label="List" 
								handleChange={changeView} />
						</div>
					</div> 
				}

				<BlogCategories activeCat={category} location={location} />
				<BlogPopular />
				<BlogTags 
					activeTags={tags} 
					location={location} 
					history={history}
					setTags={this.props.setTags} />
				
				<div className="ads">
					<img src="http://haintheme.com/demo/html/bustter/images/uploads/ads1.png" alt=""/>
				</div>
			</div>
		)
	}
} 

const mapStateToProps = ({ router }) => ({
	location: router.location
})

export default connect(mapStateToProps, { push })(BlogSidebar);