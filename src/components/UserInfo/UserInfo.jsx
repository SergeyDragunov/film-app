import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// import AvatarEditModal from '../AvatarEditModal/AvatarEditModal';
import { scrollToStart } from '../../utils';
import { SEARCH_RESULTS } from '../../constants';

class UserAvatar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			avatar: ''
		}

		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.setAvatar = this.setAvatar.bind(this);
	}

	closeModal() {
		this.setState({isOpen: false})
	}

	openModal() {
		this.setState({isOpen: true})
	}

	setAvatar(avatar) {
		this.setState({avatar});
	}

	render() {
		const { user } = this.props;
		const { avatar, /*isOpen*/ } = this.state;

		return (
			<div className="user-img">
				<div className="user-img__wrapper">
					<Link to="/user/profile">
						{	
							avatar ? 
							<img src={avatar} alt={user.firstName + " " + user.lastName} /> :
							<span>{user.firstName[0] + user.lastName[0]}</span>
						}
					</Link>
				</div>
				{/*<div>
					<button className="redbtn" onClick={this.openModal}>Change avatar</button>
				</div>*/}

				{/*<AvatarEditModal 
					isOpen={isOpen} 
					closeModal={this.closeModal} 
					avatar={avatar} 
					setAvatar={this.setAvatar}
				/>*/}
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => {
	return {
		user: user.data.data
	}
}

UserAvatar = connect(mapStateToProps, null)(UserAvatar);

const UserInfo = ({ location }) => (
	<div className="user-information">
		<UserAvatar />
		<div className="user-fav">
			<p>Your Stuff</p>
			<ul>
				<li>
					{
						window.innerWidth > 767 ?
						<Link 
							className={location.pathname.includes('content') ? 'active' : ''}
							to={{pathname: `/user/content/${SEARCH_RESULTS.FILMS}`, state: {noScroll: true}}}>Content</Link> :
						<HashLink 
							to={`/user/content/${SEARCH_RESULTS.FILMS}#userContent`}
							scroll={el => scrollToStart("#" + el.id)}>Content</HashLink>
					}
				</li>
			</ul>
		</div>
		<div className="user-fav">
			<p>Account Details</p>
			<ul>
				<li>
					{
						window.innerWidth > 767 ?
						<NavLink 
							activeClassName="active"
							to={{pathname: "/user/profile", state: {noScroll: true}}}>Profile</NavLink> :
						<HashLink 
							to={"/user/profile#userProfile"}
							scroll={el => scrollToStart("#" + el.id)}>Profile</HashLink>
					}
				</li>
				<li>
					{
						window.innerWidth > 767 ?
						<Link 
							className={location.pathname.includes('favorites') ? 'active' : ''}
							to={{pathname: `/user/favorites/${SEARCH_RESULTS.FILMS}`, state: {noScroll: true}}}>Favorites</Link> :
						<HashLink 
							to={`/user/favorites/${SEARCH_RESULTS.FILMS}#userFavorites`}
							scroll={el => scrollToStart("#" + el.id)}>Favorites</HashLink>
					}
				</li>
			</ul>
		</div>
		<div className="user-fav">
			<p>Others</p>
			<ul>
				<li>
					<HashLink
						to={"/user/profile#changePassword"}
						scroll={el => scrollToStart("#" + el.id)}>Change password</HashLink>
					</li>
				<li><a href="./">Log out</a></li>
			</ul>
		</div>
	</div>
);



export default UserInfo;