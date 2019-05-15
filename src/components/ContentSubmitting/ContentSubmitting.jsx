import React, { Component } from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';

import { SEARCH_RESULTS } from '../../constants';
import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';
import { FilmSubmit } from '../FilmView/FilmView';
import { TalentSubmit } from '../TalentView/TalentView';

import './style.css';
import { plural } from '../../utils'; 
import adjustAPIData from './adjustAPIData';
import contentActions from '../../actions/content';
import { updateUnpublished } from '../../actions/user';

class ContentSubmitting extends Component {
	handleSubmit() {
		const { formValues, content, create, update, id, formName, updateUnpublished } = this.props;
		const body = adjustAPIData(formValues, content);

		if (id === 'new' || id.includes('draft')) {
			create(content, body);
			if (id.includes('draft')) {
				const { unpublished } = JSON.parse(localStorage['user']).data;
				const newUnpublishedtArr = unpublished[plural(content)].filter(item => item.id !== id);
				updateUnpublished(content, newUnpublishedtArr, formName);
			}
		} else {
			console.log(body)
			update(content, id, body);
		}
	}

	render() {
		const { formName, formValues, content } = this.props;

		return (
			<form>
				<h2 className="content-submitting__heading">Review main features of your {content}</h2>
				{
					content === SEARCH_RESULTS.FILMS ?
					<FilmSubmit {...formValues} /> :
					content === SEARCH_RESULTS.TALENT ?
					<TalentSubmit {...formValues} /> :
					<FilmSubmit {...formValues} />
				}
				<ContentModalFooter
					formName={formName}
					content={content}
					handleSubmit={this.handleSubmit.bind(this)} />
			</form>
		)
	}
}

const mapStateToProps = state => {
	const { pathname } = state.router.location;
	let content, formName;

	if (pathname.includes(SEARCH_RESULTS.FILMS)) {
		content = SEARCH_RESULTS.FILMS;
		formName = 'newFilmForm';
	} else if (pathname.includes(SEARCH_RESULTS.TALENT)) {
		content = SEARCH_RESULTS.TALENT;
		formName = 'newTalentForm';
	} else if (pathname.includes(SEARCH_RESULTS.FESTS)) {
		content = SEARCH_RESULTS.FESTS;
		formName = 'newFestForm';
	}

	return {
		formValues: getFormValues(formName)(state) || {},
		content,
		formName
	}
};

const mapDispatchToProps = {
	create: contentActions.create,
	update: contentActions.update,
	updateUnpublished
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentSubmitting);