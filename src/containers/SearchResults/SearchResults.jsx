import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade, Collapse } from 'react-bootstrap';
import qs from 'query-string';

import { TopbarSortFilter, TopbarPageFilter } from '../../components/TopbarFilter/TopbarFilter';
import PageSingle from '../../components/PageSingle/PageSingle';
import { CommonHero } from '../../components/HeroScreens/HeroScreens';
import Sidebar from '../../components/Sidebar/Sidebar';
import FacebookPlugin from '../../components/FacebookPlugin/FacebookPlugin';
import TwitterPlugin from '../../components/TwitterPlugin/TwitterPlugin';
import SearchForm from '../../components/SearchForm/SearchForm';
import { FilmList } from '../../components/FilmView/FilmView';
import { TalentList } from '../../components/TalentView/TalentView';
import { FestList } from '../../components/FestView/FestView';
import { ContentLoader } from '../../components/Preloader/Preloader';

import { sortData, scrollToStart, plural } from '../../utils';
import { SEARCH_RESULTS } from '../../constants';
import adjustData from './adjustData';
import filterData from './filterData';
import mockFilms from './films';
import mockTalent from './talent';
import contentActions from '../../actions/content';

const mockData = {
	[SEARCH_RESULTS.FILMS]: mockFilms,
	[SEARCH_RESULTS.TALENTS]: mockTalent
}

const sorting = [
	{
		value: 'A_Z',
		type: '"Aa...Zz"'
	},
	{
		value: 'Z_A',
		type: '"Zz...Aa"'
	},
];

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isTablet: window.innerWidth <= 991,
			isCollapsed: window.innerWidth > 991,
			contentHeight: 0,
			isFetching: true,
			isFaded: true,
			data: [],
			itemsPerPage: 12,
			activePage: 1,
			activeSorting: 'A_Z',
			view: 'LIST',
			filters: {}
		}

		this.handlePageSelectChange = this.handlePageSelectChange.bind(this);
		this.handleSortingSelectChange = this.handleSortingSelectChange.bind(this);
		this.changeView = this.changeView.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.checkForTablet = this.checkForTablet.bind(this);
	}

	componentDidMount() {
		const { location, match, getAll } = this.props;
		const content = match.params.content;

		if (location.search)
			this.setState({filters: qs.parse(location.search)});
		// getAll(content);

		window.addEventListener('resize', this.checkForTablet);
	}

	componentDidUpdate(prevProps) {
		const { location, match, getAll } = this.props;

		if (location !== prevProps.location) {
			this.setState({isFaded: false});
			setTimeout(() => {
				const content = match.params.content;
				const prevContent = prevProps.match.params.content;

				if (content !== prevContent) getAll(content)

				this.setState({filters: qs.parse(this.props.location.search), activePage: 1, isFaded: true});
			}, 500);
		}

		const el = document.querySelector('.SearchResult__fade-content');

		if (el && (el.offsetHeight !== this.state.contentHeight)) {
			this.setState({contentHeight: Math.round(el.offsetHeight)});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.checkForTablet);
	}

	checkForTablet() {
		if (window.innerWidth <= 991 && !this.state.isTablet) {
			this.setState({isTablet: true, isCollapsed: false});
		} else if (window.innerWidth > 991 && this.state.isTablet) {
			this.setState({isTablet: false, isCollapsed: true});
		}
	}

	handlePageChange(page) {
		scrollToStart('.page-single');
		if (this.state.isFaded) {
			this.setState({isFaded: false});
			setTimeout(() => {
				this.setState({activePage: page, isFaded: true});
			}, 500);
		}
	}

	handlePageSelectChange(e) {
		const value = +e.target.value;
		this.setState({isFaded: false});
		setTimeout(() => {
			this.setState({
				itemsPerPage: value,
				activePage: 1,
				isFaded: true
			});
		}, 500);
	}

	handleSortingSelectChange(e) {
		this.setState({activeSorting: e.target.value})
	}

	changeView(view) {
		if(view !== this.state.view) {
			this.setState({isFaded: false});
			setTimeout(() => {
				this.setState({view, isFaded: true});
			}, 500);
		}
	}

	render() {
		const { 
			view, 
			activeSorting, 
			activePage, 
			itemsPerPage,
			isTablet,
			isCollapsed,
			filters,
			isFaded
		} = this.state;
		const { isFetching, content } = this.props;
		const allData = filterData({filters, data: mockData[content], content});
		const data = sortData(allData, activePage, itemsPerPage, activeSorting);
		const pagesCnt = Math.ceil(allData.length / itemsPerPage);
		const height = this.state.contentHeight + 'px';

		return (
			<PageSingle Hero={() => 
				<CommonHero className="hero--search"> 
					{!isFetching && <h1>Found {allData.length} {allData.length === 1 ? content : plural(content)}</h1> }
				</CommonHero>}
			>
				<PageSingle.Side order='col-md-push-8'>
					<Sidebar>
						<div>
							<button
								onClick={() => this.setState({isCollapsed: !isCollapsed})} 
								className="redbtn redbtn--search-form">Filter Items</button>
							<Collapse in={isCollapsed}>
								<div>
									{!isFetching && <SearchForm />}
								</div>
							</Collapse>
						</div>
						{
							!isTablet && 
							<div>
								<FacebookPlugin />
								<TwitterPlugin />
							</div>	
						}
					</Sidebar>
				</PageSingle.Side>
				<PageSingle.Content order='col-md-pull-4'>
					<TopbarSortFilter 
	      		type={content}
	      		view={view}
	      		isSearch={true}
	      		sortingTypes={sorting}
	      		dataLength={allData.length}
	      		activeSorting={activeSorting}
	      		handleChange={this.handleSortingSelectChange}
	      		changeView={this.changeView}/>

      		<div style={{minHeight: height}} className="SearchResult__content">
		      	<Fade in={isFaded} unmountOnExit className="SearchResult__fade-content" >
		      		<div >
		      			{(() => {
		      				if (isFetching) {
		      					return <ContentLoader />
		      				} else if (data.length) {
			      				switch(content) {
											case SEARCH_RESULTS.FILMS: 
												return <FilmList films={data} view={view} />;
											case SEARCH_RESULTS.TALENT: 
												return <TalentList talents={data} view={view} />;
											case SEARCH_RESULTS.FESTS: 
												return <FestList fests={data} view={view} />;
											default:
												return <FilmList movies={data} view={view} />;
										}
		      				} else {
		      					return <p className="search-results__message">no {content} found with such filters</p>
		      				}
		      			})()}
							</div>
		      	</Fade>
      		</div>

					<TopbarPageFilter 
						isFaded={isFaded}
						type={content}
						options={[12, 24, 36]}
						pagesCnt={pagesCnt}
						activePage={activePage}
						itemsPerPage={itemsPerPage}
						selectPage={this.selectPage}
						nextPage={this.nextPage}
						prevPage={this.prevPage}
						handlePageChange={this.handlePageChange}
						handleChange={this.handlePageSelectChange}/>
					{
						isTablet && 
						<div>
							<FacebookPlugin className="sb-facebook--marginBottom" />
							<TwitterPlugin />
						</div>	
					}
				</PageSingle.Content>
			</PageSingle>
		)
	}
}

const mapStateToProps = ({ content }) => {
	return {
		isFetching: content.settings.isFetching,
		data: adjustData(content.data || [], content.settings.content),
		content: content.settings.content || 'film'
	}
}

export default connect(mapStateToProps, { getAll: contentActions.getAll })(SearchResults);
