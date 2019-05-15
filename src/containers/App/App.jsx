import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import NoMatch from '../../components/NoMatch/NoMatch';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Home from '../Home/Home';
import FilmSingle from '../FilmSingle/FilmSingle';
import TalentSingle from '../TalentSingle/TalentSingle';
// import FestSingle from '../FestSingle/FestSingle';
import SearchResults from '../SearchResults/SearchResults';
import Spotlight from '../Spotlight/Spotlight';
import SpotlightSingle from '../SpotlightSingle/SpotlightSingle';
import User from '../User/User';

import LoginModal from '../../components/LoginModal/LoginModal';
import SignUpModal from '../../components/SignUpModal/SignUpModal.jsx';
import AddContentModal from '../../components/AddContentModal/AddContentModal';
import AwardsModal from '../../components/AwardsModal/AwardsModal';

import { SEARCH_RESULTS, SINGLE_PAGE } from '../../constants';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ?
        <Component {...props} /> :
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMatch: true 
    }

    this.toggleMatch = this.toggleMatch.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;

    if (nextProps.history.action !== "POP" && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  toggleMatch() {
    this.setState({isMatch: !this.state.isMatch});
  }

  render() {
    const { location, loggedIn } = this.props;
    const { isMatch } = this.state;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location &&
      this.previousLocation
    );

    return (
      <ScrollToTop>

        {isMatch && <Header />}
        <main>
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path='/' component={Home} />
            <Route 
              exact 
              path='/login' 
              render={props => [<LoginModal {...props} key={1} goBackPath="/" />, <Home key={2} />]} />
            <Route 
              exact 
              path='/signup' 
              render={props => [<SignUpModal {...props} key={1} goBackPath="/" />, <Home key={2} />]} />
            <Route path={`/${SINGLE_PAGE.FILM}/:id`} component={FilmSingle} />
            <Route path={`/${SINGLE_PAGE.TALENT}/:id`} component={TalentSingle} />
            {/*<Route path={`/${SINGLE_PAGE.FEST}/:id`} component={FestSingle} />*/}
            <Route exact path={`/spotlight`} component={Spotlight} />
            <Route path={`/spotlight/:id`} component={SpotlightSingle} />
            <Route path={`/${SEARCH_RESULTS.PAGE}/:content`} component={SearchResults} />
            <PrivateRoute path={`/user`} component={User} loggedIn={loggedIn} />
            <Route render={props => <NoMatch {...props} toggleMatch={this.toggleMatch} />} />
          </Switch>
        </main>
        {isMatch && <Footer />}

        { isModal && <Route path='/login' component={LoginModal} /> }
        { isModal && <Route path='/signup' component={SignUpModal} /> }
        <Route path={`/user/add-content/:content/:id`} component={AddContentModal} />
        <Route path={`/user/add-awards/:content/:id`} component={AwardsModal} />
      
      </ScrollToTop>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.settings.loggedIn
})

export default connect(mapStateToProps, null)(App);