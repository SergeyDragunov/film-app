import { countriesDB } from './countriesDB';
import { states } from './statesUSADB';

/* Sorting data for Pagination */

export const sortData = (data, page, itemsPerPage, activeSorting) => {
  let sortedData = [];
  const selectionEnd = itemsPerPage * page;
  const selectionStart = selectionEnd - itemsPerPage;

  if(activeSorting && data.length) {
    switch(activeSorting) {
      case 'A_Z': {
        const title = data[0].title ?  'title' :
                      data[0].sortName ? 'sortName' :
                      'name';
        data.sort((a, b) => a[title] > b[title] ? 1 : 
          a[title] < b[title] ? -1 : 0 );
        break;
      }
      case 'Z_A': {
        const title = data[0].title ?  'title' : 'name';
        data.sort((a, b) => a[title] < b[title] ? 1 : 
          a[title] > b[title] ? -1 : 0 );
        break;
      }
      default: {
      }
    }
  }

  for(let i = selectionStart; i < selectionEnd; i++) {
    if(data[i]) sortedData.push(data[i]);
  }

  return sortedData;
}

/* Scroll to target */

export const scrollToStart = (selector, modal) => {
  const el = document.querySelector(selector);
 
  if (el) {
    if (modal) el.scrollIntoView({behavior: 'smooth'});
    else {
      const scrollPoint = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: scrollPoint,
        behavior: "smooth"
      }); 
    }
  }
}

/* Adding Separators to Arrays */

export function intersperse(arr, sep) {
  if (arr.length === 0) {
      return [];
  }

  return arr.slice(1).reduce(function(xs, x, i) {
      return xs.concat([sep, x]);
  }, [arr[0]]);
}

/* Set Country */

export const setCountry = (countryCode) => {
  let countryName;
  for (let i = 0; i < countriesDB.length; i++) {
    if (countryCode === countriesDB[i].alpha3Code) countryName = countriesDB[i].name; 
  }

  return countryName;
}

export const setState = (state) => {
  return states[Object.keys(states).filter(s => s === state)[0]];
}

/* format running time */

export const setRunningTime = (time) => {
  const parts = time.split(':');
  const h = !!parseInt(parts[0]) ? parseInt(parts[0]) + ' hrs ' : '';
  const m = !!parseInt(parts[1]) ? parseInt(parts[1]) + ' min ' : '';
  const s = !!parseInt(parts[2]) ? parseInt(parts[2]) + ' sec ' : '';

  return h + m + s;
}

/* plural */

export const plural = (str) => str !== 'talent' ? str + 's' : str;

/* Yotube ID */

export const YouTubeGetID = (url) => {
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_-]/i); 
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}