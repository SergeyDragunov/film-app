import React,  { Component } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../../constants';

const AbortController = window.AbortController;

export class TalentLink extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '...'
		};
	}

	componentDidMount() {
		const id = this.props.id;
		this.controller = new AbortController();
		const signal = this.controller.signal;

		fetch(`${API_URL}/talent/${id}?projection={"name":1}`, {signal})
			.then(res => res.json())
			.then(data => this.setState({name: data.name}))
			.catch(err => err);
	}

	componentWillUnmount() {
		this.controller.abort();
	}

	render() {
		const { id } = this.props;

		return <Link to={`/talent/${id}`}>{this.state.name}</Link>
	}
}