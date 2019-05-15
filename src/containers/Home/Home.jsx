import React, { Component } from 'react';

// import Preloader from '../../components/Preloader/Preloader'
import StartSlider from '../../components/StartSlider/StartSlider';
import FilmItems from '../../components/FilmItems/FilmItems';
import Trailers from '../../components/Trailers/Trailers';
import LatestNews from '../../components/LatestNews/LatestNews';

import adjustData from './adjustData';
import mockData from './data';

// The Movie API just as mock. Main logic uses services + redux
const API = "https://api.themoviedb.org/3/";
const API_FILMS = `${API}movie/popular?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&page=1`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        celebSpotlight: mockData.celebSpotlight
      },
      errorMsg: ''
    }
  }

  componentDidMount() {
    // The Movie API just as mock. Main logic uses services + redux
    fetch(API_FILMS)
      .then(res => {
        if(!res.ok) throw Error(res.status)
        else return res
      })
      .then(res => res.json())
      .then(data => this.setState({
        data: {
          ...this.state.data,
          mainSlider: adjustData(data.results),
          miniSlider1: adjustData(data.results),
        }}))
      .catch(error => this.setState({errorMsg: error.message}));
  }


  render() {
    const { data, isFetched } = this.state;

    return (
      <div>
          <div>
            <StartSlider movies={ data.mainSlider } isFetched={isFetched} />
            <FilmItems 
              isFetched={isFetched}
              miniSlider1={ data.miniSlider1 } 
              miniSlider2={ data.miniSlider2 }
              spotlight={ data.celebSpotlight } />
            <Trailers />
            <LatestNews />
          </div> 
      </div>
    )
  }
}

export default Home;   