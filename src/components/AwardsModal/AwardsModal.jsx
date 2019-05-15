import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import Modal from '../Modal/Modal';
import { ContentControl } from '../ContentControls/ContentControls';
import AwardsForm from '../AwardsForm/AwardsForm';

// import { SEARCH_RESULTS } from '../../constants';
import { scrollToStart } from '../../utils';
import './style.css';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const awardsSample = [
  // {
  //   "year" : "2018",
  //   "results" : {
  //     0: {
  //       "id" : "f0600062",
  //       "name" : "RHODE ISLAND INTERNATIONAL FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Grand Prize, Short Film",
  //       "result" : "Winner"
  //     },
  //     1: {
  //       "id" : null,
  //       "name" : "KIRKCALDY FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Best Film",
  //       "result" : "Nominee"
  //     },
  //     2: {
  //       "id" : null,
  //       "name" : "AFI FEST",
  //       "award" : "Best Film",
  //       "result" : "Nominee"
  //     },
  //     3: {
  //       "id" : null,
  //       "name" : "KIRKCALDY FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Best Film",
  //       "result" : "Nominee"
  //     },
  //     4: {
  //       "id" : null,
  //       "name" : "KIRKCALDY FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Best Film",
  //       "result" : "Nominee"
  //     },
  //     5: {
  //       "id" : null,
  //       "name" : "KIRKCALDY FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Best Film",
  //       "result" : "Nominee"
  //     },
  //     6: {
  //       "id" : null,
  //       "name" : "KIRKCALDY FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Best Film",
  //       "result" : "Nominee"
  //     }
  //   }
  // },
  // {
  //   "year" : "2019",
  //   "results" : {
  //     0: {
  //       "id" : "f0600023",
  //       "name" : "CINEQUEST FILM FESTIVAL RHODE ISLAND INTERNATIONAL FILM FESTIVAL",
  //       "award" : "Grand Prize, Short Film",
  //       "result" : "Honorable mention"
  //     }
  //   }
  // },
];

const YearAwards = ({ results, editAward, removeAward, removeYear }) => (
  <div className='year-awards'>
    <ContentControl 
      className="content-control--awards"
      remove
      removeHandler={() => removeYear(results.year)}
    />
    <h3 className="year-awards__year">{results.year}</h3>
    <div className="year-awards__awards row">
      {Object.keys(results.results).map(key => {
          const award = results.results[key];
          return (
            <div className="year-awards__award col-xs-6 col-sm-4 col-md-3" key={key}>
              <div className={`year-awards__award-icon ${award.result.split(' ')[0]}`} title={award.result}></div>
              <h5 className="year-awards__award-fest">
                {
                  award.id ?
                  <Link to={`/festival/${award.id}`} title={award.name}>
                    <ResponsiveEllipsis text={award.name} component="span" maxLine={2} />
                  </Link> :
                  <ResponsiveEllipsis text={award.name} component="span" maxLine={2} title={award.name} />
                }
              </h5>
              <LinesEllipsis className="year-awards__award-name" text={award.award} component="span" maxLine={1} />
              <ContentControl 
                className="content-control--award-item"
                remove
                edit
                editHandler={() => editAward({year: results.year, award: award}, key)}
                removeHandler={() => removeAward(results.year, key)}
              />
            </div>
          )
        }
      )}
    </div>
  </div>
);

class AwardsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      editId: null,
      isOpen: false,
      awards: awardsSample,
      awardToEdit: ''
    }

    this.addAwards = this.addAwards.bind(this);
    this.editAward = this.editAward.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.removeYear = this.removeYear.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.removeAward = this.removeAward.bind(this);
  }

  componentDidMount() {
    this.setState({isOpen: true});
  }

  editAward(awardToEdit, editId) {
    this.setState({awardToEdit, editId});
    scrollToStart('.awards-form', true)
  }

  cancelEdit() {
    this.setState({awardToEdit: ''});
  }

  removeYear(year) {
    const awards = this.state.awards.filter(yearFest => year !== yearFest.year);
    this.setState({awards});
  }

  removeAward(year, key) {
    const awards = this.state.awards.filter(yearFest => {
      if (year === yearFest.year) {
        delete yearFest.results[key];
        if (!Object.keys(yearFest.results).length) {
          return false;
        }
      }
      return true;
    });

    this.setState({awards});
  }

  addAwards(fest,) {
    const id = this.state.editId || this.state.id;
    let newYear = true;

    const result = {
      id: fest.id,
      name: fest.name,
      award: fest.award,
      result: fest.result
    };

    let awards = this.state.awards.map(festYear => {
      if (festYear.year === fest.year) {
        festYear.results[id] = result;
        newYear = false;
      } 
      return festYear;
    })

    if (newYear) {
      awards.push({
        year: fest.year,
        results: {
          [id]: result
        }
      });
    }

    this.setState({
      awards,
      editId: null, 
      id: this.state.id + 1
    });
  }

  closeModal() {    
    const { history } = this.props;
    this.setState({isOpen: false});
    history.goBack();
  }

  render() {
    const { isOpen, awards, awardToEdit } = this.state;
    // const { match } = this.props;

    return (
      <Modal 
        large
        isOpen={isOpen}
        closeModal={this.closeModal}
        modalContentClass={'awards-modal'}>
        <h2 className="modal__heading">Awards</h2>
        <div className="awards-modal__awards-list">
          {awards.map((results, key) => <YearAwards removeYear={this.removeYear} removeAward={this.removeAward} editAward={this.editAward} results={results} key={key} />)}
        </div>
        <AwardsForm cancelEdit={this.cancelEdit} addAwards={this.addAwards} awardToEdit={awardToEdit} />
      </Modal>
    )
  }
}

export default connect(null, null)(AwardsModal);