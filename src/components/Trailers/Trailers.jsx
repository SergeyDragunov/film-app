import React, { Component } from 'react';
// import Slider from 'react-slick';
import Slider from '../../assets/lib/react-slick/lib'

const settingsFor = {
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: 'ondemand',
  arrows: false,
  fade: true
};

const settingsNav = {
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  focusOnSelect: true,
  vertical: true
};

const trailers = [
  {
    name: 'Wonder Woman',
    src: 'https://www.youtube.com/embed/1Q8fG0TtVAY',
    image: 'http://haintheme.com/demo/html/bustter/images/uploads/trailer7.jpg',
    duration: '2:31'
  },
  {
    name: 'Oblivion: Official Teaser Trailer',
    src: 'https://www.youtube.com/embed/w0qQkSuWOS8',
    image: 'http://haintheme.com/demo/html/bustter/images/uploads/trailer7.jpg',
    duration: '2:32'
  },
  {
    name: 'Exclusive Interview:  Skull Island',
    src: 'https://www.youtube.com/embed/44LdLqgOpjo',
    image: 'http://haintheme.com/demo/html/bustter/images/uploads/trailer7.jpg',
    duration: '2:33'
  },
  {
    name: 'Logan: Director James Mangold Interview',
    src: 'https://www.youtube.com/embed/gbug3zTm3Ws',
    image: 'http://haintheme.com/demo/html/bustter/images/uploads/trailer7.jpg',
    duration: '2:34'
  },
  {
    name: 'Beauty and the Beast: Official Teaser Trailer 2',
    src: 'https://www.youtube.com/embed/e3Nl_TCQXuw',
    image: 'http://haintheme.com/demo/html/bustter/images/uploads/trailer7.jpg',
    duration: '2:35'
  },
  {
    name: 'Fast&Furious 8',
    src: 'https://www.youtube.com/embed/NxhEZG0k9_w',
    image: 'http://haintheme.com/demo/html/bustter/images/uploads/trailer7.jpg',
    duration: '2:36'
  }
];

class Trailers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      for: null,
      nav: null,
    };
  }

  componentDidMount() {
    this.setState({
      for: this.sliderFor,
      nav: this.sliderNav
    });
  }

  render() {
    return (
      <div className="trailers">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">
              <div className="title-hd">
                <h2>SCREENLAND</h2>
                <a href="./" className="viewall">View all <i className="icon ion-ios-arrow-forward"></i></a>
              </div>
              <div className="videos">

                <Slider 
                  className="slider-for-2 video-ft" 
                  asNavFor={this.state.nav}
                  ref={slider => (this.sliderFor = slider)}
                  {...settingsFor}>
                  {trailers.map((trailer, key) => (
                      <div key={key}>
                        <iframe 
                          title={trailer.name} 
                          className="item-video loading-content" 
                          src={trailer.src} 
                          data-src={trailer.src}>
                        </iframe>
                      </div>
                    ))}
                </Slider>
                
                <Slider 
                  className="slider-nav-2 thumb-ft" 
                  asNavFor={this.state.for}
                  ref={slider => (this.sliderNav = slider)}
                  {...settingsNav}>
                  {trailers.map((trailer, key) => (
                      <div className="item" key={key} >
                        <div className="trailer-img">
                          <img src={trailer.image}  alt={trailer.name} />
                        </div>
                        <div className="trailer-infor">
                          <h4 className="desc">{trailer.name}</h4>
                          <p>{trailer.duration}</p>
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>   
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trailers;