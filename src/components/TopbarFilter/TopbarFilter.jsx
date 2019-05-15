import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { SEARCH_RESULTS } from '../../constants';
import { plural } from '../../utils';
import './style.css';

const contentToggleLinks = [SEARCH_RESULTS.FILMS, SEARCH_RESULTS.TALENT, SEARCH_RESULTS.FESTS];

export const TopbarContentToggle = ({ isFetching, type, disableFestival }) => (
	<div className="topbar-content-toogle">
		{
			contentToggleLinks.map((link, key) => 
				!disableFestival || link !== SEARCH_RESULTS.FESTS ?
				<Link 
					className={type === link ? 'active' : ''}
					style={isFetching ? {pointerEvents: 'none'} : {}}
					to={{pathname: `${link}`, state: {noScroll: true}}} 
					key={key}>{plural(link)}</Link> : null)
		}
	</div> 
);

export const TopbarSortFilter = ({ 
	type, 
	dataLength, 
	activeSorting, 
	handleChange, 
	isSearch, 
	view, 
	changeView, 
	sortingTypes, 
	contentToggle, 
	isFetching 
}) => {
	const typeText = type;

	return (
		<div className="topbar-filter">
			<p>Found <span>{dataLength} {dataLength !== 1 ? plural(typeText) : typeText}</span> in total</p>

			{
				contentToggle ?
				<TopbarContentToggle isFetching={isFetching} type={type} /> : 
				null
			}
			{
				sortingTypes &&
				<div className='topbar-filter__sorting-select'>
					<label htmlFor='selectSortingType'>Sort by:</label>
					<select id='selectSortingType' value={activeSorting} onChange={handleChange}>
						{sortingTypes.map((option, key) => (
								<option 
									value={option.value} 
									key={key}>{option.type}</option>
							))}
					</select>
				</div>
			}
			{
				isSearch &&
				<div className='topbar-filter__view-buttons'>
					<button className="list" onClick={() => changeView('LIST')} title="List view">
						<i className={`icon ion-ios-list ${view === 'LIST' ? 'active' : ''}`}></i>
						<span className="sr-only">(list view)</span>
					</button>
					<button className="grid" onClick={() => changeView('GRID')} title="Grid view">
						<i className={`icon ion-md-apps ${view === 'GRID' ? 'active' : ''}`}></i>
						<span className="sr-only">(grid view)</span>
					</button>
				</div>
			}
		</div>
	)
}

const PaginationSmall = ({ activePage, pagesCnt, handlePageChange }) => {
	const selectPage = (page) => {
    if(page !== activePage) handlePageChange(page); 
  }

  const nextPage = () => {
    handlePageChange(activePage + 1);
  }

  const prevPage = () => {
    if(activePage !== 1) handlePageChange(activePage - 1);
  }	

	return (
		<div className="pagination2">
			<span>Page {activePage} of {pagesCnt}:</span>
			<div>
				{
					activePage !== 1 ? 
					<button onClick={prevPage}><i className="icon ion-ios-arrow-back"></i></button> :
					<span></span>
				}
				{(() => {
					let arr = [];
					for(let i = 1; i <= pagesCnt; i++) {
						let page;
						if(i === 1 || i === pagesCnt) {
							page = <button 
								className={i === activePage ? 'active' : ''}
								key={i} 
								onClick={() => selectPage(i)}>{i}</button>;
						} else if (i < 7 && activePage < 4) {
							page = <button 
								className={i === activePage ? 'active' : ''}
								key={i} 
								onClick={() => selectPage(i)}>{i}</button>;
						} else if (i > pagesCnt - 6 && activePage > pagesCnt - 4) {
							page = <button 
								className={i === activePage ? 'active' : ''}
								key={i} 
								onClick={() => selectPage(i)}>{i}</button>;
						} else if(i > activePage - 3 && i < activePage + 3) {
							page = <button 
								className={i === activePage ? 'active' : ''}
								key={i} 
								onClick={() => selectPage(i)}>{i}</button>;
						} else if (i === pagesCnt - 1 || i === 2) {
							page = <span key={i}>...</span>;
						} 
						arr.push(page);
					}
					return arr;
				})()}
				{
					activePage !== pagesCnt ? 
					<button onClick={nextPage}><i className="icon ion-ios-arrow-forward"></i></button> :
					<span></span>
				}
			</div>
		</div>
	)
} 

export class TopbarPageFilter extends Component {
	render() {
		const { itemsPerPage, handleChange, options, type, pagesCnt } = this.props;
		const typeText = type;

		return (
			<div className="topbar-filter">
				<div className="topbar-filter__items-per-page">
					<label>Items per page:</label>
					<select 
						value={itemsPerPage}
						onChange={(e) => handleChange(e)}>
						{options.map((value, key) => <option value={value} key={key}>{value} {plural(typeText)}</option>)}
					</select>
				</div>
				{pagesCnt > 1 ? <PaginationSmall {...this.props} /> : null}
			</div>
		)
	}
}