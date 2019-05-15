import React from 'react';

const Pagination = ({ activePage, pagesCnt, handleChange }) => {

  const selectPage = (page) => {
    if(page !== activePage) handleChange(page); 
  }

  const nextPage = () => {
    handleChange(activePage + 1);
  }

  const prevPage = () => {
    if(activePage !== 1) handleChange(activePage - 1);
  }

	return (
		<ul className="pagination">
  		<li className="icon-prev">
        <button 
          disabled={activePage === 1}
          onClick={prevPage}>
          <i className="icon ion-ios-arrow-back"></i></button>
      </li>
        {(() => {
          let arr = [];
          for(let i = 1; i <= pagesCnt; i++) {
            let page;
            if(i === 1 || i === pagesCnt) {
              page = 
                <li key={i}
                  className={i === activePage ? 'active' : ''} 
                  onClick={() => selectPage(i)}><button>{i}</button></li>;
            } else if (i < 7 && activePage < 4) {
              page = 
                <li key={i}
                  className={i === activePage ? 'active' : ''} 
                  onClick={() => selectPage(i)}><button>{i}</button></li>;
            } else if (i > pagesCnt - 6 && activePage > pagesCnt - 4) {
              page = 
                <li key={i}
                  className={i === activePage ? 'active' : ''} 
                  onClick={() => selectPage(i)}><button>{i}</button></li>;
            } else if(i > activePage - 3 && i < activePage + 3) {
              page = 
                <li key={i}
                  className={i === activePage ? 'active' : ''} 
                  onClick={() => selectPage(i)}><button>{i}</button></li>;
            } else if (i === pagesCnt - 1 || i === 2) {
              page = <li key={i}><button tabIndex={-1}>...</button></li>;
            } 
            arr.push(page);
          }
          return arr;
        })()}
			<li className="icon-next">
        <button 
          disabled={activePage === pagesCnt || !pagesCnt}
          onClick={nextPage}>
        <i className="icon ion-ios-arrow-forward"></i></button>
      </li>
  	</ul>
	);
} 

export default Pagination;