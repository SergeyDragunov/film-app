import React from 'react';
import { Link } from 'react-router-dom';

import { ShareLinks } from '../SocialLinks/SocialLinks';

import './style.css';

// function createMarkup(text) {
//   return {__html: text};
// }

const ArticleFull = ({ article }) => (
	<article className="article-full">
		{
			article.media && article.media.heroImage &&
			<div className="artical-full__top-img">
				<img src={article.media.heroImage} alt={article.title} />
			</div>
		}
		{
			article.text ? 
			<div className="article-full__text" dangerouslySetInnerHTML={{__html: article.text}}></div> : 
			<div className="article-full__text-placeholder"></div>
		}
		<div className="article-full__footer">
			<ShareLinks className="social-link--article-full" />
			{
				true ?
				<div className="article-full__tags">
					<h4 className="article-full__tags-title">Tags</h4>
					<div className="article-full__tags-wrapper">
						{['Batman', 'film', 'homeland'].map((tag, key) => 
							<Link to={{pathname: `/spotlight`, search: `?tags[]=${tag}`}} className="article__tag article__tag--full" key={key}>{tag}</Link>
						)}
					</div>
				</div> : null
			}
		</div>
	</article>
);

export default ArticleFull;