import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import PageSingle from '../../components/PageSingle/PageSingle';
import { UserHero } from '../../components/HeroScreens/HeroScreens';
import UserInfo from '../../components/UserInfo/UserInfo';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserFavorites from '../../components/UserFavorites/UserFavorites';
import UserContent from '../../components/UserContent/UserContent';

class User extends Component {
	render() {
		const { match, location, user } = this.props;
		let name = '';

		if (user.firstName && user.lastName) {
			const poss = user.lastName[user.lastName.length - 1] === 's' ? "'" : "'s";
			name = `${user.firstName} ${user.lastName + poss}`
		}

		return (
			<PageSingle Hero={() => 
				<UserHero>
					<h1>{name} profile</h1>
					<p>Director</p>
				</UserHero>}>
				<PageSingle.Side cols={3}>
					<UserInfo match={match} location={location} />
				</PageSingle.Side>
				<PageSingle.Content cols={9}>
					<Switch >
						<Route path={`${match.url}/profile`} component={UserProfile} />
						<Route path={`${match.url}/favorites/:content`} component={UserFavorites} />
						<Route path={`${match.url}/content/:content`} component={UserContent} />
						<Route path={`${match.url}`} component={UserProfile} />
					</Switch>
				</PageSingle.Content>
			</PageSingle>
		)
	}
}

const mapDispatchToProps = ({ user }) => ({
	user: user.data.data
})

export default connect(mapDispatchToProps, null)(User);