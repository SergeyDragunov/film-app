import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from '../../constants';

const AbortController = window.AbortController;

class FilmCastItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			image: '',
			role: '',
			initials: ''
		}
	}

	componentDidMount() { 	
		const id = this.props.id;
		this.controller = new AbortController();
		const signal = this.controller.signal;

	  fetch(`${API_URL}/talent/${id}?projection={"name":2}`, {signal})
     	.then(res => res.json())
     	.then(data => this.setState({name: data.name, initials: this.setInitials(data.name)}))
     	.catch(err => err);
	}

	componentWillUnmount() {
		this.controller.abort();
	}

	setInitials(name) {
		return name.split(' ').map(word => word.substring(0, 1)).join('');
	}

	render() {
		const { image, name, role, initials } = this.state;
		const id = this.props.id;

		return (
			<div className="cast-it">
				<div className="cast-left">
					{
						image ?
						<img src={image} alt={name} /> :
						<h4>{initials}</h4>
					}
					<Link to={`/talent/${id}`}>{name}</Link>
				</div>
				{role ? <p>...  {role}</p> : null}
			</div>
		);
	}
}

const FilmCast = ({ filmCast, cast }) => (
	<div className="mvcast-item">											
		{cast.map(id => <FilmCastItem id={id} key={id} />)}
	</div>
);

export default FilmCast;