import React, { Component } from 'react';
import { Tweet } from 'react-twitter-widgets';
import Slider from 'react-slick';

const slickParam = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  draggable: true,
  // lazyLoad: 'ondemand',
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,

      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      }
    }
  ]
}

const tweetOptions = {
  conversation : 'none',    // or all
  cards        : 'hidden',  // or visible 
  linkColor    : 'default', // default is blue
  theme        : 'light'    // or dark
}

const tweetsId = ['599202861751410688', '297462728598122498'];

class TwitterPlugin extends Component {
  render() {
    return (
      <div className="sb-twitter sb-it">
        <h4 className="sb-title sb-title--sidebar">Tweet to us</h4>
        <Slider className="slick-tw" {...slickParam}>
          {(() => (
            tweetsId.map(id => (
              <Tweet 
                key={id}
                className="tweet item loading-content" 
                tweetId={id} 
                options={tweetOptions}/>
            ))
          ))()}
        </Slider>					
      </div>
    )
  }
}

export default TwitterPlugin;