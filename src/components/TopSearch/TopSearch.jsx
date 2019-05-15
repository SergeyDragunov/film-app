import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import qs from 'query-string';

import { SEARCH_RESULTS } from '../../constants';

class TopSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selectValue: SEARCH_RESULTS.FILMS
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if(e.key === 'Enter' && this.state.search) {
      const content = this.state.selectValue;
      let pathname =  `/${SEARCH_RESULTS.PAGE}/${content}`;
      const filters = {}
      if (content === SEARCH_RESULTS.TALENT) {
        filters.name = this.state.search;
      } else  {
        filters.title = this.state.search;
      }
      if (content === 'spotlight') pathname = `/spotlight`;

      const queryString = qs.stringify(filters);
      
      this.props.push({
        pathname, 
        search: `?${queryString}`
      });

      this.setState({search: ''});
    }
  }

  render() {
    return (
      <div className="top-search">
        <select 
          value={this.state.selectValue} 
          onChange={e => this.setState({selectValue: e.target.value})}>
          <option value={SEARCH_RESULTS.FILMS}>Films</option>
          <option value={SEARCH_RESULTS.TALENT}>Talent</option>
          <option value={SEARCH_RESULTS.FESTS}>Festivals</option>
          <option value='spotlight'>Spotlight</option>
          <option value={SEARCH_RESULTS.FESTS} disabled>News</option>
        </select>
        <label htmlFor="topSearch" className="sr-only">(search field)</label>
        <input 
          id='topSearch'
          type="text" 
          placeholder="Search for a film, talent or festival"
          value={this.state.search}
          onKeyPress={e => this.handleKeyPress(e)}
          onChange={e => this.setState({search: e.target.value})} />
      </div>
    )
  }
}

const mapStateToProps = ({ router }) => {
  return {
    location: router.location
  }
}

const mapDispatchToProps = {
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);