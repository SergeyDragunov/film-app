import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { Link } from 'react-router-dom';

import './style.css';

const Title = responsiveHOC()(LinesEllipsis);
const Text = responsiveHOC()(HTMLEllipsis);

export class Article extends Component {
	render() {
		const { article, view, update } = this.props;
		return (
			<article className={"article " + (view === 'GRID' ? "article--grid" : "article--list")}>
				<Link className="article__img-wrapper" to={`/spotlight/${article.id}`} tabIndex={-1}>
					{article.media.smallImage && <img src={article.media.smallImage} alt={article.title} />}
				</Link>
				<div className="article__info">
					<h3 className="article__heading">
						<Link to={`/spotlight/${article.id}`} className='article__title' title={article.title}>
							{
								update ?
								<Title 
									title={article.title}
									text={article.title} 
									maxLine={view === 'LIST' ? 1 : 2} 
									basedOn='letters' /> : null
							}
						</Link>
					</h3>
					<span className="article__date">{article.date}</span>
					<div className="article__categories">
						<span className="article__category">{article.category}</span>
					</div>
					<div className={`article__tags`}>
						<span className="article__tags-title">Tags: </span> 
						{article.tags.map((tag, key) => <span className="article__tag" key={key}>{tag}</span>)}	
					</div>
					<div className={`article__description-wrapper`}>
						{
							update ? 
							<Text
								className={`article__description`}
								unsafeHTML={article.text} 
								maxLine={view === 'LIST' ? 2 : 3} /> : null
						}
					</div>
				</div>
			</article>
		);
	}
}

export const ArticlesList = ({ view, articles, update }) => (
	<div className={view === 'GRID' ? 'row article-row' : ''}>
		{
			articles.map((article, key) => (
				<div className={view === 'GRID' ? 'col-md-4 col-sm-6 col-xs-12' : ''} key={key} >
					<Article article={article} view={view} update={update} />
				</div>
			))
		}
	</div>
);