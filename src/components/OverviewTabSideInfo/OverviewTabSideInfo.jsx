import React,  { Component } from 'react';
import { Link } from 'react-router-dom';

import { TalentLink } from '../Links/Links';

import { intersperse } from '../../utils';
import { adjustData } from './adjustData';
import './style.css';

class OverviewTabSideInfo extends Component {
	render() {
		const info = adjustData(this.props.data);

		return (
			<div className="overview-side-info">
				{info.map((item, key) => (
					<div className="overview-side-info-item" key={key}>
						<h6 className="overview-side-info-item__title">{item.title}</h6>
						<p>
							{
								item.ids ? 
								intersperse(item.ids.map((id, key) => <TalentLink id={id} key={key} />), ', ')
								 :
								item.links ?
								intersperse(item.links.map((link, key) => <Link to={link.path} key={key} className="capitalize">{link.name}</Link>), ', ')
								:
								item.info ? item.info :
								item.tags.map((tag, key) => <span className="tag" key={key}><a href="./">{tag}</a></span>)
							}
						</p>
					</div>
				))}
			</div>
		)
	}
}

export default OverviewTabSideInfo;