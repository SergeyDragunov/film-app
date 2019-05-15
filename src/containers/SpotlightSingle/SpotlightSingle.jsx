import React, { Component } from 'react';

import BlogSidebar from '../../components/BlogSidebar/BlogSidebar'
import ArticleFull from '../../components/ArticleFull/ArticleFull';
import PageSingle from '../../components/PageSingle/PageSingle';
import { ArticleHero } from '../../components/HeroScreens/HeroScreens';

import './style.css';

class SpotlightSingle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			article: {
				title: "This is My Blog Entry",
		    media: {
	        heroImage : "",
		    },
		    author: {
	        "name" : "Joe Smith",
	        "email" : "joe@rise.media"
		    },
			}
		}
	}

	render() {
		const { location } = this.props;
		const { article } = this.state;

		return (
			<PageSingle Hero={() => <ArticleHero article={article} />}>
				<PageSingle.Content cols={9}>
					<ArticleFull article={article} />
				</PageSingle.Content>
				<PageSingle.Side cols={3}>
					<BlogSidebar 
						location={location}
					/>
				</PageSingle.Side>
			</PageSingle>
		)
	}
}

export default SpotlightSingle;