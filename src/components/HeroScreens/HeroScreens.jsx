import React from 'react';
import { Link } from 'react-router-dom';

import { ShareLinks } from '../../components/SocialLinks/SocialLinks';

import defaultHeroImage from '../../assets/images/main-bg.jpg'; 
import './style.css';

export const CommonHero = ({ children, className, style }) => (
	<div style={style} className={`hero common-hero ${className ? className : ''}`}>
		<div className="hero-ct">
			{children}				
		</div>
	</div>
)

export const UserHero = ({ children }) => (
	<div className="hero user-hero">
		<div className="hero-ct">
			{children}				
		</div>
	</div>
)

export const HeroScreen = ({ style }) => (
	<div className="hero" style={style}></div>
);

export const BlogHero = ({ isFilters, filteredData, title, category, tags }) => (
	<CommonHero> 
		<h1>spotlight</h1>
		{
			isFilters ? 
			<div>
				<p className="blog__search-result">{`Found: ${filteredData.length} articles`}</p>
				<div className="blog__applied-fitlers">
					{title ? <p>Keywords: <span className="">"{title}"</span></p> : null}
					{category ? <p>Category: <span className="article__category">{category}</span></p> : null}
					{
						tags.length ? 
						<p>Tags: {tags.map((tag, key) => <span className="article__tag" key={key}>{tag}</span>)}</p> :
						null
					}
				</div>
				<div>
					<Link to={{search: '', state: {noScroll: true}}} className="blog__clear-filters">clear filters</Link>
				</div>
			</div> :
			null
		}
	</CommonHero>
);

export const ArticleHero = ({ article }) => (
	<CommonHero 
		style={{
			backgroundImage: article.media && article.media.heroImage ? 
				`url(${article.media.heroImage})`: 
				`url(${defaultHeroImage})`
	}}> 
		<div>
			<h1 className='article-full__heading'>{article.title}</h1>
			{article.category && <span className="article__category">{article.category}</span>}
			<ShareLinks className="share-link--hero" />
			<p>Views: 3,834 | Date: { article.date } | Author: { article.author && article.author.name }</p>
		</div>
	</CommonHero>
);