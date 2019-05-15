import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fade } from 'react-bootstrap';

import { TopbarSortFilter, TopbarPageFilter } from '../../components/TopbarFilter/TopbarFilter';
import { FilmList } from '../../components/FilmView/FilmView';
import { TalentList } from '../../components/TalentView/TalentView';
import { FestList } from '../../components/FestView/FestView';
import { ContentLoader } from '../../components/Preloader/Preloader';

import { patchUser } from '../../actions/user';
import { sortData, plural, scrollToStart } from '../../utils/';
import { SEARCH_RESULTS, API_URL } from '../../constants';
import adjustData from '../../containers/SearchResults/adjustData';

class UserFavorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetching: true,
			isFaded: true,
			contentHeight: 0,
			data: [],
			itemsPerPage: 10,
			activePage: 1,
			activeSorting: 'DATE_UP',
			view: 'LIST',
			content: SEARCH_RESULTS.FILMS,
		}

		this.remove = this.remove.bind(this);
		this.changeView = this.changeView.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handlePageSelectChange = this.handlePageSelectChange.bind(this);
		this.handleSortingSelectChange = this.handleSortingSelectChange.bind(this);
	}

	componentDidMount() {
		const params = this.props.match.params;
		const content = params.content ? params.content : SEARCH_RESULTS.FILMS;

		this.setState({content});
		this.fetchData(content);
	}

	componentDidUpdate(prevProps, prevState) {
		const { location, favorites, match } = this.props; 
		const params = match.params;
		const prevParams = prevProps.match.params;
		const content = params.content;

		if (location !== prevProps.location) {
			if (params.content !== prevParams.content) {
				this.setState({content, isFetching: true, data: []});
				this.fetchData(content);
			}
			this.setState({activePage: 1, isFaded: true});
		}

		if (favorites[plural(content)].length !== prevProps.favorites[plural(content)].length) {
			this.fetchData(content);
		}

		const el = document.querySelector('.SearchResult__fade-content');
		if (el.offsetHeight !== this.state.contentHeight) {
			this.setState({contentHeight: Math.round(el.offsetHeight)});
		}
	}

	fetchData(content) {
		Promise.all(this.props.favorites[plural(content)].map(id => fetch(`${API_URL}/${content}/${id}`).then(res => res.json())))
			.then(data => this.setState({data: adjustData(data, content), isFetching: false}));
	}

	handlePageChange(page) {
		scrollToStart('.page-single');
		this.setState({isFaded: false});
		setTimeout(() => {
			this.setState({activePage: page, isFaded: true});
		}, 500);
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

	remove(id) {
		const { patchUser } = this.props;
		const { content } = this.state;

		const  patch = {
      type: 'follows',
      content,
      verb: 'remove',
      id
    };

    patchUser(patch);
		this.setState({isFetching: true, data: []});
	}

	render() {
		const { 
			data, 
			content, 
			itemsPerPage, 
			activePage, 
			activeSorting, 
			view, 
			isFetching, 
			isFaded 
		} = this.state;
		const sortedData = sortData(data, activePage, itemsPerPage);
		const pagesCnt = Math.ceil(data.length / itemsPerPage);
		const height = this.state.contentHeight + 'px';

		return (
			<div id="userFavorites">
				<TopbarSortFilter 
					contentToggle
      		type={content}
      		view={view}
      		isSearch={true}
      		isFetching={isFetching}
      		dataLength={data.length}
      		activeSorting={activeSorting}
      		handleChange={this.handleSortingSelectChange}
      		changeView={this.changeView}/>

      	<div style={{minHeight: height}} className="SearchResult__content">
	    		<Fade in={isFaded} unmountOnExit className="SearchResult__fade-content">
	    			<div>
		    			{(() => {
		    				if(data.length) {
		      				switch(content) {
										case SEARCH_RESULTS.FILMS:
											return (
												<FilmList 
													films={sortedData} 
													controls={{remove: true}} 
													removeHandler={this.remove} 
													view={view} />
												);
										case SEARCH_RESULTS.TALENT:
											return (
												<TalentList 
													talents={sortedData} 
													controls={{remove: true}} 
													removeHandler={this.remove} 
													view={view} />
												);
										case SEARCH_RESULTS.FESTS:
											return (
												<FestList 
													fests={sortedData} 
													controls={{remove: true}} 
													removeHandler={this.remove} 
													view={view} />
												);
										default: {
											return null;
										}
									}
		    				} else {
		    					return !isFetching ? 
		    						<p className="search-results__message">
		    							Find your favorite{' '}
		    							<Link to={`/${SEARCH_RESULTS.PAGE}/${content}`}>{content}</Link>
		    						</p> : 
		    						<ContentLoader />
		    				}
		    			})()}
	    			</div>
					</Fade>
				</div>

      	<TopbarPageFilter 
					type={content}
					options={[10, 20, 30]}
					pagesCnt={pagesCnt}
					activePage={activePage}
					itemsPerPage={itemsPerPage}
					selectPage={this.selectPage}
					nextPage={this.nextPage}
					prevPage={this.prevPage}
					handlePageChange={this.handlePageChange}
					handleChange={this.handlePageSelectChange}/>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => ({
	favorites: user.data.data.favorites
});

export default connect(mapStateToProps, { patchUser })(UserFavorites);