import React, { Component } from 'react';
import { Fade } from 'react-bootstrap';
import qs from 'query-string';

import PageSingle from '../../components/PageSingle/PageSingle';
import { BlogHero } from '../../components/HeroScreens/HeroScreens';
import Pagination from '../../components/Pagination/Pagination';
import { ArticlesList } from '../../components/ArticleView/ArticleView';
import { ContentLoader } from '../../components/Preloader/Preloader';
import BlogSidebar from '../../components/BlogSidebar/BlogSidebar';

// import { API_URL } from '../../constants'; 
import adjustData from './adjustData';
import mockData from './articlesDB';
import { sortData, scrollToStart } from '../../utils';
import './style.css';

const data = [...mockData, ...mockData, ...mockData, ...mockData, ...mockData];

class Spotlight extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			searchValue: '',
			category: '',
			tags: [],
			isFetching: true,
			isFaded: true,
			data: [],
			itemsPerPage: 9,
			activePage: 1,
			view: 'GRID'
		}

		this.changeView = this.changeView.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		const { location } = this.props;
		let filters = location.search ? qs.parse(location.search, {arrayFormat: 'bracket'}) : {};
		
		setTimeout(() => {
			this.setState({data: adjustData(data), ...filters, isFetching: false});
		}, 300);
	}

	componentDidUpdate(prevProps) {
		const { location } = this.props;
		let filters = qs.parse(location.search, {arrayFormat: 'bracket'});
		const { title, category, tags } = filters;

		filters = {
			searchValue: title ? title : '',
			title: title ? title : '',
			category: category ? category : '',
			tags: tags ? tags : [],
		};

		if (location !== prevProps.location) {
			this.setState({isFaded: false});
			setTimeout(() => {
				this.setState({...filters, activePage: 1, isFaded: true});
			}, 200);
		}
	}

	handlePageChange(page) {
		scrollToStart('.page-single');
		this.setState({isFaded: false});
		setTimeout(() => {
			this.setState({activePage: page, isFaded: true});
		}, 500);
	}

	changeView(e) {
		const view = e.target.value;
		if(view !== this.state.view) {
			const itemsPerPage = view === 'GRID' ? 9 : 6;
			const dif = 9 / 6;
			let activePage = view === 'GRID' ?  Math.floor(this.state.activePage / dif) : Math.floor(this.state.activePage * dif);
			activePage = activePage || 1;
				
			this.setState({isFaded: false});
			setTimeout(() => {
				this.setState({view, itemsPerPage, activePage, isFaded: true});
			}, 200);
		}
	}

	filterData() {
		const { data, title, category, tags } = this.state;

		return data.filter(item => {
			let filtered = true;
			if(title && !item.title.toLowerCase().includes(title.toLowerCase())) {
				filtered = false;
			} else if (category && item.category.toLowerCase() !== category) {
				filtered = false;
			} else if (tags.length) {
				for(let i = 0; i < item.tags.length; i++ ) {
					if (tags.includes(item.tags[i].toLowerCase())) {
						filtered = true;
						break;
					} else {
						filtered = false;
					}
				}
			} 
			return filtered;
		});
	}

	render() {
		const { location } = this.props;
		const { view, activePage, itemsPerPage, category, title, tags, isFetching } = this.state;
		const filteredData = this.filterData();
		const data = sortData(filteredData, activePage, itemsPerPage);
		const pagesCnt = Math.ceil(filteredData.length / itemsPerPage);
		const isFilters = !!title || !!category || !!tags.length;
		const isArticlePage = location.pathname.includes('article');

		return (
			<PageSingle Hero={() => 
				<BlogHero 
					filteredData={filteredData}
					isFilters={isFilters} 
					isArticlePage={isArticlePage} 
					{...this.props} 
					{...this.state} />
				} >

				<PageSingle.Content cols={9}>
					<Fade in={this.state.isFaded} >
						<div>
							{
								isFetching ?
								<ContentLoader /> : 
								!data.length ?
								<p className="search-results__message">no spotlight found with such filters</p> :
								<ArticlesList 
									articles={data} 
									view={view} 
									update={this.state.isFaded} />
							}
						</div>
					</Fade>

					<Pagination 
						activePage={activePage} 
						pagesCnt={pagesCnt}
						handleChange={this.handlePageChange} />
				</PageSingle.Content>

				<PageSingle.Side cols={3}>
					<BlogSidebar
						toggleView
						view={view}
						category={category}
						tags={tags} 
						changeView={this.changeView} />
				</PageSingle.Side>
			</PageSingle>	
		)
	}
}

export default Spotlight;