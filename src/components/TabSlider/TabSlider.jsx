import React, { Component } from 'react';
import Slider from "react-slick";

import MediaItem from '../MediaItem/MediaItem';

import './style.css';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  lazyLoad: 'progressive',
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
        slidesToScroll: 2
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

class TabSlider extends Component {
  render() {
    const { isFetched } = this.props;
    const data = this.props.data ? this.props.data : [{},{},{},{}];

    return (
      <Slider  className={`tab-slider ${this.props.show ? 'showen' : ''} ${isFetched ? 'tab-slider--dots' : ''}`} {...settings}>
        {data.map((item, key) =>
          <MediaItem 
            small
            className="media-item--small"
            key={key}
            link={item.target || './'}
            data={item} />
        )}
      </Slider>
    )
  }
}

export default TabSlider;