import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { FilmList } from '../../components/FilmView/FilmView';
import { TalentList } from '../../components/TalentView/TalentView';
import { FestList } from '../../components/FestView/FestView';
import { ContentLoader } from '../../components/Preloader/Preloader';
import { TopbarContentToggle } from '../../components/TopbarFilter/TopbarFilter';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { ControlText } from '../ContentControls/ContentControls';

import { SEARCH_RESULTS, API_URL } from '../../constants';
import adjustData from '../../containers/SearchResults/adjustData';
import { plural } from '../../utils';
import { updateUnpublished } from '../../actions/user';
import contentActions from '../../actions/content';

import './style.css';

const forms = {
  [SEARCH_RESULTS.FILMS]: 'newFilmForm',
  [SEARCH_RESULTS.TALENT]: 'newTalentForm',
  [SEARCH_RESULTS.FESTS]: 'newFestForm'
}

class UserContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId: null,
			data: [],
			content: SEARCH_RESULTS.FILMS,
			isFetching: true,
			isOpen: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.removeDraft = this.removeDraft.bind(this);
	}

	componentDidMount() {
		const params = this.props.match.params;
		const content = params.content;

		this.setState({content});
		this.fetchData(content);
	}

	componentDidUpdate(prevProps, prevState) {
		const { match, location, userContent, contentUpdated, setContentUpdated } = this.props;
		const params = match.params;
		const prevParams = prevProps.match.params;
		const content = params.content;

		if (location !== prevProps.location) {
			if (content !== prevParams.content) {
				this.setState({content, isFetching: true, data: []});
				this.fetchData(content);
			}
		}

		if (contentUpdated) {
			this.setState({isFetching: true, data: []});
			this.fetchData(content);
			setContentUpdated();
		}

		if (userContent[plural(content)].length !== prevProps.userContent[plural(content)].length) {
			this.setState({isFetching: true, data: []});
			this.fetchData(content);
		}
	}

	fetchData(content) {
		const { userContent } = this.props;

		if (userContent) {
			if (!userContent[plural(content)]) this.props.replace('/404')
	    else {
	    	const projection = {
	    		title: 1,
	    		media: 2,
	    		_nmdata: 3,
	    		name: 4,
	    		roles: 5,
	    		country: 6
	    	};
				Promise.all(userContent[plural(content)].map(id => 
					fetch(`${API_URL}/${content}/${id}?projection=${JSON.stringify(projection)}`)
						.then(res => res.json())
						.catch(err => console.log(err))
				))
					.then(data => this.setState({data: adjustData(data.filter(d => d), content), isFetching: false}))
					.catch(err => console.log(err));	
	    }
		}
	}

	removeDraft() {
		const { match, userDraftContent, updateUnpublished } = this.props; 
		const id = this.state.activeId;
		const content = match.params.content;
		const newDraft = userDraftContent[plural(content)].filter(d => d.id !== id);

		updateUnpublished(content, newDraft, forms[content]);
		this.closeModal();
	}

	closeModal() {
		this.setState({isOpen: false})
	}

	openModal() {
		this.setState({isOpen: true})
	}

	render() {
		const { userUpdating, userDraftContent } = this.props;
		const { data, isFetching, content, isOpen } = this.state;

		return (
			<div id="userContent" className="form-style-1 user-pro">
				<div className="user-content__toggle-wrapper">
					<TopbarContentToggle isFetching={isFetching} type={content} disableFestival />
					<Link 
						className="user-content__add-btn1" 
						to={{pathname: `/user/add-content/${content}/new/general`, state: {modal: true, noScroll: true}}}
					>
						Add {content}
					</Link>
				</div>
				{
					isFetching ? 
					<ContentLoader /> :
					content === SEARCH_RESULTS.FILMS ?
					<FilmList 
						userPage 
						films={data} 
						view={'GRID'} 
						controls={{edit: true}} 
						removeHandler={this.openModal} /> :
					content === SEARCH_RESULTS.TALENT ?
					<TalentList 
						dark 
						talents={data} 
						view={'GRID'} 
						controls={{edit: true}} 
						removeHandler={this.openModal} /> :
					content === SEARCH_RESULTS.FESTS ? 
					<FestList 
						userPage 
						fests={data} 
						view={'GRID'} 
						controls={{edit: true}} 
						removeHandler={this.openModal} /> : 
					null
				}
				{
					(!data.length && !isFetching) &&
					<ControlText content={content} />
				}
				{
					!!userDraftContent[plural(content)].length &&
					<div>
						<h2 className="user-content__heading">Draft {plural(content)}</h2>
						{
							userUpdating ? 
							<ContentLoader /> :
							content === SEARCH_RESULTS.FILMS ?
							<FilmList 
								draft 
								films={userDraftContent[plural(content)]} 
								view={'GRID'} 
								userPage 
								controls={{edit: true, remove: true}} 
								removeHandler={id => {
									this.openModal();
									this.setState({activeId: id});
								}} /> :
							content === SEARCH_RESULTS.TALENT ?
							<TalentList 
								dark 
								draft
								talents={userDraftContent[plural(content)]} 
								view={'GRID'} 
								controls={{edit: true, remove: true}} 
								removeHandler={id => {
									this.openModal();
									this.setState({activeId: id});
								}} /> :
							content === SEARCH_RESULTS.FESTS ? 
							<FestList 
								userPage 
								fests={userDraftContent[plural(content)]} 
								view={'GRID'} 
								controls={{edit: true, remove: true}} 
								removeHandler={this.openModal} /> : 
							null
						}
					</div>
				}
				<ConfirmModal 
					isOpen={isOpen} 
					submit={this.removeDraft}
					closeModal={this.closeModal}>
					Do you really want to delete this item?
				</ConfirmModal>
			</div>
		)
	}
}

const mapStateToProps = ({ user, content }) => ({
	userUpdating: user.settings.updating,
	userContent: user.data.data.content,
	userDraftContent: user.data.data.unpublished,
	contentUpdated: content.settings.isUpdated
});

const mapDispatchToProps = { 
	replace, 
	updateUnpublished, 
	setContentUpdated: contentActions.setUpdated
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContent);