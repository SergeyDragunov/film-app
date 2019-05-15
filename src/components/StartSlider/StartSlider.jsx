import React, { Component } from 'react';
import Slider from "react-slick";

import MediaItem from '../MediaItem/MediaItem'; 

import './style.css';

import fullBg from '../../assets/images/main-bg.jpg';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplaySpeed: 4000
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

class StartSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgLoaded: false
    }

    this.loadBg = this.loadBg.bind(this);
  }

  componentDidMount() {
    this.loadBg();
  }

  loadBg() {
    const img = new Image();

    img.onload = () => {
      this.setState({bgLoaded: true});
    }

    if (fullBg) img.src = fullBg;
  }

  render() {
    const movies = this.props.movies ? this.props.movies : [{}, {}, {}, {}];
    const { isFetched } = this.props;

    return (
      <div className={`slider ${this.state.bgLoaded ? "slider-bg" : ""}`}>
        <div className="container">
          <Slider className={`start-slider ${isFetched ? 'start-slider--dots' : ''}`} {...settings}>
            {movies.map((movie, key) => 
              <MediaItem 
                key={key}
                className="media-item--slider"
                data={movie} 
                link={movie.target || './'} />
            )}
          </Slider>
        </div>
      </div>
    )
  }
}

export default StartSlider;