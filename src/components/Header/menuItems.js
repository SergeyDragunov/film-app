import { SEARCH_RESULTS, SINGLE_PAGE } from '../../constants';

export default [
  // {
  //   name: 'Home',
  //   items: [
  //     ["index.html", "Home 01"],
  //     ["homev2.html", "Home 02"],
  //     ["homev3.html", "Home 03"]
  //   ]
  // },
  {
    name: 'films',
    items: [
      // {
      //   name: 'Movie grid',
      //   items: [
      //     ['moviegrid.html','Movie grid'],
      //     ['moviegridfw.html','movie grid full width']
      //   ]
      // },
      [`/${SEARCH_RESULTS.PAGE}/${SEARCH_RESULTS.FILMS}`, "all films"],
      [`/${SINGLE_PAGE.FILM}/299534`, "Film single"],
    ]
  },
  // {
  //   name: 'talent',
  //   items: [
  //     [`/${SEARCH_RESULTS.PAGE}/${SEARCH_RESULTS.TALENT}`, "all talent"],
  //     [`/${SINGLE_PAGE.TALENT}/t0600004`, "talent single"]
  //   ]
  // },
  // {
  //   name: 'festival',
  //   items: [
  //     [`/${SEARCH_RESULTS.PAGE}/${SEARCH_RESULTS.FESTS}`, "all festivals"],
  //     [`/${SINGLE_PAGE.FEST}/f0600022`, "festival single"]
  //   ]
  // },
  {
    name: 'news',
    items: [
      ["/spotlight", "spotlight"],
      ["/spotlight/s0600002", "spotlight single"]
    ]
  },
  {
    name: 'community',
    items: [
      ["/user/profile", "user"],
    ]
  },
];