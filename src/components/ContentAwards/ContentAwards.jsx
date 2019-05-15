import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ContentModalFooter from '../ContentModalFooter/ContentModalFooter';
import { SEARCH_RESULTS } from '../../constants';

let festivalsSample = [
	{
		year: 2017,
		start_date: "2017-02-24T00:00:00.000Z",
		end_date: "2017-02-24T00:00:00.000Z",
		awards: [
			{
				award: "Best Short Film",
				nominees: [
					{
						film_id: "5b90273d8f6e9b87b7763f02",
						result: "Nominee"
					},
					{
						film_id: "5b90273e8f6e9b87b7763f03",
						result: "Nominee"
					},
					{
						film_id: "5b90273e8f6e9b87b7763f04",
						result: "Nominee"
					},
					{
						film_id: "5b90273e8f6e9b87b7763f05",
						result: "Winner"
					},
					{
						film_id: "5b90273e8f6e9b87b7763f06",
						result: "Winner"
					}
				],
				qualifiers: [
					"oscar"
				]
			},
			{
				award: "Best Animated Short Film",
				nominees: [
					{
						film_id: "5b90273f8f6e9b87b7763f40",
						result: "Nominee"
					},
					{
						film_id: "5b90273f8f6e9b87b7763f41",
						result: "Winner"
					},
					{
						film_id: "5b90273f8f6e9b87b7763f42",
						result: "Nominee"
					},
					{
						film_id: "5b90273f8f6e9b87b7763f43",
						result: "Nominee"
					}
				],
				qualifiers: []
			}
		]
	}
];


class ContentAwards extends Component {
	constructor(props) {
		super(props);
		this.state = {
      fests: festivalsSample,
		}
	}

	render() {
    const { fests } = this.state;
		return (
			<div>
        {fests.map((fest, key) => 
  				<div className="fest-year" key={key}>
  					<div className="fest-year__dates">
              <div className="fest-year__date">
                <span className="fest-year__date-title">Start of the festival: </span>
                <span className="fest-year__date-value">{moment(fest.start_date).format('MM/DD')}</span>
              </div>
              <div className="fest-year__date">
                <span className="fest-year__date-title">End of the festival: </span>
                <span className="fest-year__date-value">{moment(fest.start_date).format('MM/DD')}</span>
              </div>
            </div>
  				</div>
        )}
				<ContentModalFooter
					formName={'newFestForm'}
					content={SEARCH_RESULTS.FESTS}
					nextTab="media" />	
			</div>
		)
	}
}

export default connect(null, null)(ContentAwards);