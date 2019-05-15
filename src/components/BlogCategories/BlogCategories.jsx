import React, { Component } from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';

// import { API_URL } from '../../constants'; 

import mockData from '../../containers/Spotlight/articlesDB';

const setQueryString = (cate, location) => {
	let search;
	if (location.search) {
		const filters = qs.parse(location.search, {arrayFormat: 'bracket'});
		filters.category = cate.toLowerCase();
		const qsFilters = qs.stringify(filters, {arrayFormat: 'bracket'});
		search = `?${qsFilters}`;
	} else {
		search = `?category=${cate.toLowerCase()}`
	}
	return search;
}

class BlogCategories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cates: []
		}
	}

	componentDidMount() {
		const categories = mockData.map(item => item.category);
		let uniqueCates = [...new Set(categories)];

		const cates = uniqueCates.map(cat => ({
			name: cat,
			cnt: categories.filter(item => item === cat).length
		}));

		this.setState({cates});
	}

	render() {
		const { activeCat, location } = this.props;
		const { cates } = this.state;

		return (
			<div className="sb-cate sb-it">
				<h4 className="sb-title">Categories</h4>
				<ul>
					{cates.map((cate, key) => <li key={key}>
						<Link 
							className={activeCat === cate.name.toLowerCase() ? 'active' : ''}
							to={{
								pathname: '/spotlight',
								search: setQueryString(cate.name, location),
								state: window.innerWidth > 991 ? {noScroll: true} : undefined
						}}>{cate.name} ({cate.cnt})</Link>
					</li>)}
				</ul>
			</div>
		);
	}
};

export default BlogCategories;