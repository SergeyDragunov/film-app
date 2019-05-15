import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import qs from 'query-string';

const tags = ['Batman', 'film', 'homeland', 'Fast & Furious', 'Dead Walker', 'King', 'Beauty'];

class BlogTags extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTags: []
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const { location } = this.props;
		const filters = qs.parse(location.search, {arrayFormat: 'bracket'});
		if (filters.tags) {
			this.setState({activeTags: filters.tags});
		}
	}

	componentDidUpdate(prevProps) {
		const { location } = this.props;
		const filters = qs.parse(location.search, {arrayFormat: 'bracket'});
		if (prevProps.location.search !== location.search) {
			this.setState({activeTags: filters.tags || []});
		}
	}

	handleChange(e) {
		const { push, location } = this.props;
		const value = e.target.value.toLowerCase();
		const checked = e.target.checked;
		const { activeTags } = this.state;
		let ob = {};
		let search;
		let tags;

		activeTags.map(key => ob[key] = true);
		if (checked) ob[value] = true
		else delete ob[value];

		tags = Object.keys(ob);

		if (location.search) {
			const filters = qs.parse(location.search, {arrayFormat: 'bracket'});
			filters.tags = tags;
			const qsFilters = qs.stringify(filters, {arrayFormat: 'bracket'});
			search = `?${qsFilters}`;
		} else {
			const qsTags = qs.stringify({tags: tags}, {arrayFormat: 'bracket'});
			search = `?${qsTags}`;
		}

		push({
			pathname: '/spotlight',
			search,
			state: window.innerWidth > 991 ? {noScroll: true} : undefined
		});
	}

	render() {
		const { activeTags } = this.state;
		
		return (
			<div className="sb-tags sb-it">
				<h4 className="sb-title">tags</h4>
				<ul className="tag-items">
					{tags.map((tag, key) => (
						<li key={key}>
							<input 
								type="checkbox" 
								id={tag} 
								className='sr-only' 
								name='tag' 
								value={tag}
								checked={!!activeTags && activeTags.includes(tag.toLowerCase())} 
								onChange={this.handleChange} />
							<label htmlFor={tag}>{tag}</label>
						</li>
					))}
				</ul>
			</div>
		);
	}
};

export default connect(null, { push })(BlogTags);