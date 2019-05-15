import React, { Component } from 'react';

import { Ads } from '../Ads/Ads' 
import Sidebar from '../Sidebar/Sidebar';
import FacebookPlugin from '../FacebookPlugin/FacebookPlugin';
import TwitterPlugin from '../TwitterPlugin/TwitterPlugin';

const moreNews = [
  {
    title: 'Michael Shannon Frontrunner to play Cable in “Deadpool 2”',
    src: '',
    timeAgo: '13 hours ago'
  },
  {
    title: 'French cannibal horror “Raw” inspires L.A. theater to hand out “Barf Bags”',
    src: '',
    timeAgo: '13 hours ago'
  },
  {
    title: 'Laura Dern in talks to join Justin Kelly’s biopic “JT Leroy”',
    src: '',
    timeAgo: '13 hours ago'
  },
  {
    title: 'China punishes more than 300 cinemas for box office cheating',
    src: '',
    timeAgo: '13 hours ago'
  },
];

const MoreNewsList = () => {
  return (
    <div className="more-items">
      {(() => (
        moreNews.map((news, key) => (
          <div className="more-it" key={key}>
            <h6><a href="./">{news.title}</a></h6>
            <span className="time">{news.timeAgo}</span>
          </div>
        ))
      ))()}
    </div>
  );
};

class LatestNews extends Component {
  render() {
    return (
      <div className="latestnew">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-8">
              <Ads width='736px'>
                <img src="http://haintheme.com/demo/html/bustter/images/uploads/ads2.png" alt="" width="728" height="106" />
              </Ads>
              <div className="title-hd">
                <h2>Latest news</h2>
              </div>
              <div className="tabs">
                {/*<ul className="tab-links-3">
                  <li className="active"><a href="#tab31">#Movies </a></li>
                  <li><a href="#tab32"> #TV Shows </a></li>              
                  <li><a href="#tab33">  # Celebs</a></li>                       
                </ul>*/}
                  <div className="tab-content">
                      <div id="tab31" className="tab active">
                          {/*<div className="row">*/}
                            <div className="blog-item-style-1">
                              <img src="http://haintheme.com/demo/html/bustter/images/uploads/blog-it1.jpg" alt="" width="170" height="250" />
                              <div className="blog-it-infor">
                                <h3><a href="./">Brie Larson to play first female white house candidate Victoria Woodull in Amazon film</a></h3>
                                <span className="time">13 hours ago</span>
                                <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                              </div>
                            </div>
                          {/*</div>*/}
                      </div>
                      <div id="tab32" className="tab">
                        <div className="row">
                            <div className="blog-item-style-1">
                              <img src="images/uploads/blog-it2.jpg" alt="" width="170" height="250" />
                              <div className="blog-it-infor">
                                <h3><a href="./">Tab 2</a></h3>
                                <span className="time">13 hours ago</span>
                                <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                              </div>
                            </div>
                          </div>
                      </div>
                      <div id="tab33" className="tab">
                        <div className="row">
                            <div className="blog-item-style-1">
                              <img src="images/uploads/blog-it1.jpg" alt="" width="170" height="250" />
                              <div className="blog-it-infor">
                                <h3><a href="./">Tab 3</a></h3>
                                <span className="time">13 hours ago</span>
                                <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="morenew">
                <div className="title-hd">
                  <h3>More news on Blockbuster</h3>
                  <a href="./" className="viewall">See all news<i className="icon ion-ios-arrow-forward"></i></a>
                </div>

                <MoreNewsList />

              </div>
            </div>
            <div className="col-md-4">
              <Sidebar>
                <FacebookPlugin />
                <TwitterPlugin />
              </Sidebar>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LatestNews;