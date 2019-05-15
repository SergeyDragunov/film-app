import React, { Component } from 'react';

import { SEARCH_RESULTS } from '../../constants';
import { Link } from 'react-router-dom';

import { plural } from '../../utils';
import './style.css';

export class ContentControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocused: false
		}

		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onFocus() {
		if (!this.state.isFocused) {
			this.setState({isFocused: true})
		}
	}

	onBlur() {
		this.setState({isFocused: false})
	}

	render() {
		const { 
			// awardHandler, 
			static: _static,
			editHandler, 
			removeHandler, 
			className, 
			award, 
			edit, 
			remove,
			id,
			content
		} = this.props;
		const { isFocused } = this.state;

		return (
			<div 
				className={"content-control " + 
				(className || '') + 
				(isFocused ? ' content-control--focused' : '') + 
				(_static ? ' content-control--static' : '')}
			>
				{ 
					award &&
					<Link
						onFocus={this.onFocus} 
						onBlur={this.onBlur}
						to={{pathname: `/user/add-awards/${content}/${id}`, state: {modal: true, noScroll: true}}}
						className="content-control__btn content-control__btn--award" 
						title='Add Awards' 
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.481 19.481" width="512" height="512">
						  <path d="M10.201.758l2.478 5.865 6.344.545a.5.5 0 0 1 .285.876l-4.812 4.169 1.442 6.202a.5.5 0 0 1-.745.541l-5.452-3.288-5.452 3.288a.5.5 0 0 1-.745-.541l1.442-6.202-4.813-4.17a.5.5 0 0 1 .285-.876l6.344-.545L9.28.758a.5.5 0 0 1 .921 0z" fill="#FFF"/>
						</svg>
						<span className="content-control__btn-text">Awards</span>
						<span className="sr-only">(Add Awards)</span>
					</Link>
				}
				{
					edit && editHandler ?
					<button 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						type="button"
						onClick={editHandler}
						className="content-control__btn content-control__btn--edit" 
						title='Edit'
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 528.899 528.899">
						  <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z" fill="#FFF"/>
						</svg>
						<span className="content-control__btn-text">Edit</span>
						<span className="sr-only">(Edit)</span>
					</button> :
					edit ?
					<Link 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						to={{pathname: `/user/add-content/${content}/${id}/general`, state: {modal: true, noScroll: true}}}
						className="content-control__btn content-control__btn--edit" 
						title='Edit'
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 528.899 528.899">
						  <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z" fill="#FFF"/>
						</svg>
						<span className="content-control__btn-text">Edit</span>
						<span className="sr-only">(Edit)</span>
					</Link> : null
				}
				{
					remove &&
					<button 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						ref={r => this.removeButton = r}
						type="button"
						className="content-control__btn content-control__btn--delete" 
						title='Delete' 
						onClick={() => removeHandler(id)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" width="512" height="512">
						  <path d="M131.804 106.491l75.936-75.936c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.491 81.18 30.554 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.989 6.99-6.989 18.323 0 25.312l75.937 75.936-75.937 75.937c-6.989 6.99-6.989 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0l75.937-75.937 75.937 75.937c6.989 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.322 0-25.312l-75.936-75.936z" fill="#FFF" fillRule="evenodd" clipRule="evenodd"/>
						</svg>
						<span className="content-control__btn-text">Remove</span>
						<span className="sr-only">(Delete)</span>
					</button>		
				}
			</div>
		);
	} 
}


export const ContentAddBtn = () => (
	<div className="user-content__add-btn-wrapper">
		<Link to={{pathname:'/user/add-content/general', state: {modal: true, noScroll: true}}} className="user-content__add-btn">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.86 491.86" width="512" height="512">
			  <path d="M465.167 211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316 18.267-34.316 26.69v184.924H26.69C18.267 211.614 0 223.053 0 245.929s18.267 34.316 26.69 34.316h184.924v184.924c0 8.422 11.438 26.69 34.316 26.69s34.316-18.268 34.316-26.69V280.245H465.17c8.422 0 26.69-11.438 26.69-34.316s-18.27-34.315-26.693-34.315z" fill="#fe5b60"/>
			</svg>
		</Link>
	</div>
);

export const ControlText = ({ content }) => (
	<div className="content-control-text">
    <p>
      Press the button to add {plural(content)} or look over 
      <Link
        to={`/${SEARCH_RESULTS.PAGE}/${content}`}
      > all {plural(content)} </Link> 
      to find yours
    </p>
  </div>
)