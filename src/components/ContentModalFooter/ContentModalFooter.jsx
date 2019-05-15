import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset, getFormValues, isInvalid, isPristine } from 'redux-form';

import { plural } from '../../utils';
import { updateUnpublished } from '../../actions/user';

const ID = () => 'draft_' + Math.random().toString(36).substr(2, 9);

const ContentModalFooter = ({ 
	contentUpdating,
	userUpdating,
	content, 
	nextTab, 
	invalid, 
	pristine,
	reset, 
	formName, 
	formValues,
	handleSubmit, 
	id, 
	match, 
	updateUnpublished 
}) => {
	const disabled = userUpdating || invalid || pristine;

	const save = () => {
		const { unpublished } = JSON.parse(localStorage['user']).data;
		const body = formValues;
		let newUnpublishedtArr = [];
		if (body.id) {
			newUnpublishedtArr = unpublished[plural(content)].map(item => item.id === body.id ? body : item);
		} else {
			body.id = ID();
			newUnpublishedtArr = [...unpublished[plural(content)], body];
		}
		
		if (!invalid)
			updateUnpublished(content, newUnpublishedtArr, formName);
	}

	return (
		<div className="content-modal__footer">
			<Link 
				className={`content-modal__reset-btn modal__btn modal__btn--inline modal__btn--white ${userUpdating ? 'disabled' : ''}`}
				onClick={() => {
					if (!userUpdating) {
						reset(formName);
						localStorage.removeItem(formName);
					}
				}}
				to={{
		      pathname: `/user/add-content/${content}/${id || 'new'}/general`, 
		      state: {
		        modal: true,
		        noScroll: true
		      }
		    }} 
			>
				Reset
			</Link>
			{
				(id === 'new' || id.includes('draft')) &&
				<button 
					type="button" 
					onClick={save}
					className="content-modal__save-exit-btn modal__btn--inline modal__btn" 
					disabled={disabled}
				>
					Save and Exit
				</button>
			}
			{
				nextTab &&
				<Link 
					className={`content-modal__next-step-btn modal__btn modal__btn--inline ${disabled ? 'disabled' : ''}`}
					onClick={e => {if (disabled) e.preventDefault()}} 
					to={{
			      pathname: `/user/add-content/${content}/${id || 'new'}/${nextTab}`, 
			      state: {
			        modal: true,
			      }
			    }} 
				>
					Next Step
				</Link>
			}
			{
				handleSubmit &&
				<button 
					onClick={handleSubmit}
					type="button" 
					className="content-modal__send-btn modal__btn--inline modal__btn" 
					disabled={disabled}
				>
					{(id === 'new' || id.includes('draft')) ? `Submit ${content}` : `Update ${content}`}
				</button>
			}
		</div>
	);
};

const mapStateToProps = state => ({
	id: state.contentModal.id, 
	userUpdating: state.user.settings.updating,
	contentUpdating: state.content.settings.isUpdating,
	formName: state.contentModal.formName,
	formValues: getFormValues(state.contentModal.formName)(state) || {},
	invalid: isInvalid(state.contentModal.formName)(state),
	pristine: isPristine(state.contentModal.formName)(state)
});

export default connect(mapStateToProps, { reset, updateUnpublished })(ContentModalFooter);