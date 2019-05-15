import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TabSlider from '../TabSlider/TabSlider';
import Sidebar from '../Sidebar/Sidebar';
// import Spotlight from '../Spotlight/Spotlight';

import { SEARCH_RESULTS, /*SINGLE_PAGE*/ } from '../../constants';
import { Ads } from '../Ads/Ads';

// class TabLinks extends Component {
//   render() {
//     const { tabLinks } = this.props;
//     return (
//       <ul className="tab-links">
//         {(() => (
//           tabLinks.map((link, key) => (
//             <li 
//               className={this.props.activeTab === link ? 'active' : ''}
//               onClick={() => this.props.setTab(link)}
//               key={key}>
//               <a href={`#${link}`}>#{link}</a></li>
//           ))
//         ))()}                  
//       </ul>
//     )
//   }
// }

// class MovieTabs extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeTab: 'POPULAR',
//       show: true,
//     }

//     this.setTab = this.setTab.bind(this);
//   }

//   setTabLinks() {
//     const { movies } = this.props;

//     let ob = {};
//     for(let i = 0; i < movies.length; i++) {
//       ob[movies[i].category] = true;
//     }
//     return Object.keys(ob);
//   }

//   sortMovies() {
//     const { movies } = this.props;

//     return movies.filter(movie => {
//       return movie.category === this.state.activeTab;
//     });
//   }

//   setTab(tab) {
//     this.setState({activeTab: tab, show: false})

//     setTimeout(() => {
//       this.setState({show: true})
//     }, 500);
//   }

//   render() {
//     const tabLinks = this.setTabLinks();

//     return (
//       <div className="tabs">
//         <TabLinks tabLinks={tabLinks} setTab={this.setTab} activeTab={this.state.activeTab}/>
//         <div className="row">
//           <TabSlider movies={this.sortMovies()} show={this.state.show}/>
//         </div>
//       </div>
//     )
//   }
// }

const MiniSlider = ({ data, heading, viewAllLink, isFetched }) => (
  <div>
    <div className="title-hd">
      <h2>{heading}</h2>
      <Link to={`/${SEARCH_RESULTS.PAGE}/${viewAllLink}`} className="viewall">View all <i className="icon ion-ios-arrow-forward"></i></Link>
    </div>
    {/*<MovieTabs movies={miniSlider1}/>*/}
    <TabSlider isFetched={isFetched} data={data} show={true} />
  </div>
);

class FilmItems extends Component {
  render() {
    const { miniSlider1, /*miniSlider2,*/ /*spotlight,*/ isFetched } = this.props;

    return (
      <div className="movie-items">
        <div className="container">
          <div className="row ipad-width">

            <div className="col-md-8">
              <MiniSlider 
                isFetched={isFetched}
                data={miniSlider1} 
                heading='latest films'
                viewAllLink={SEARCH_RESULTS.FILMS} />
              {/*<MiniSlider 
                isFetched={isFetched}
                data={miniSlider2} 
                heading='latest talent'
                viewAllLink={SEARCH_RESULTS.TALENT} />*/}
              {/*<MiniSlider 
                data={festivals} 
                heading='recent festivals'
                viewAllLink={SEARCH_RESULTS.FESTS} />*/}
            </div>

            <div className="col-md-4">
              <Sidebar>
                <Ads>
                  <img src='http://haintheme.com/demo/html/bustter/images/uploads/ads1.png' alt="ads" />
                </Ads>
                {/*<Spotlight 
                  data={spotlight} 
                  heading='Talent'
                  linkText='Talent'
                  contentType={SEARCH_RESULTS.TALENT} 
                  link={`${SINGLE_PAGE.TALENT}/t0600004`} />*/}
                {/*<Spotlight 
                  data={festivalsSpotlight}
                  heading='Festival'
                  linkText='Festivals'  
                  contentType={SEARCH_RESULTS.FESTS}
                  link={SINGLE_PAGE.FEST} />
                <Spotlight 
                  data={filmsSpotlight} 
                  heading='Film'
                  linkText='Films'
                  contentType={SEARCH_RESULTS.FILMS}
                  link={SINGLE_PAGE.FILM} />*/}
              </Sidebar>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default FilmItems;