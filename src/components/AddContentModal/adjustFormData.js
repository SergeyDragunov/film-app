import { setCountry, setState } from '../../utils';
import { API_URL } from '../../constants';

import { YouTubeGetID } from '../../utils'; 

const creditsOptions = [
  {value: 'director', label: 'Director'},
  {value: 'writer', label: 'Writer'},
  {value: 'producer', label: 'Producer'},
  {value: 'dop', label: 'Cinematographer'},
  {value: 'editor', label: 'Editor'},
  {value: 'productionDesigner', label: 'Production Designer'},
  {value: 'costumeDesigner', label: 'Costume Designer'},
  {value: 'music', label: 'Music'},
  {value: 'sound', label: 'Sound'},
  {value: 'cast', label: 'Cast'}
];

const setCreditsRoleOption = (role) => ({
  value: role,
  label: creditsOptions.filter(({ value }) => value === role)[0].label
});

const setVideo = (src) => {
  if (src.includes('youtube')) {
    return {src, id: YouTubeGetID(src), channel: 'youtube'}
  } else if (src.includes('vimeo')) {
    const id = src.split('/')[src.split('/').length - 1].trim();
    return {src, id, channel: 'vimeo'}
  } else return null;
} 

const adjustFormData = (data) => {
  return {
    poster: (data.media && data.media.moviePoster && data.media.moviePoster.medium) || 
      (data.media && data.media.festivalPoster && data.media.festivalPoster.medium),
    photo: data.media && data.media.headshot && data.media.headshot.medium,
    title: data.title,
    name: data.name,
    dob: data.dob,
    firstName: data.name && data.name.split(' ')[0],
    lastName: data.name && data.name.split(' ').slice(1).join(' '),
    altTitle: data.altTitle,
    category: (data.category && data.category.length) ? data.category.map(item => ({value: item, label: item})) : [],
    genres: (data.genres && data.genres.length) ? data.genres.map(item => ({value: item, label: item})) : [],
    keywords: (data.keywords && data.keywords.length) ? data.keywords.map(item => ({value: item, label: item})) : [],
    country: data.country && {value: data.country, label: setCountry(data.country)},
    state: data.state && {value: data.state, label: setState(data.state)},
    language: data.language && {value: data.language, label: data.language},
    releaseDateUS: data.releaseDateUS && new Date(data.releaseDateUS),
    synopsis: data.synopsis && data.synopsis,
    bio: data.bio && data.bio, // should be changed
    runningTime: data.runningTime && data.runningTime,
    gender: data.gender && {value: data.gender, label: data.gender === 'M' ? 'Male' : 'Female'},
    trailer: data.media && data.media.trailer,
    roles: data.roles && data.roles.map(role => setCreditsRoleOption(role)),
    filmSchool: data.filmSchool && data.filmSchool,
    videos: data.media && data.media.videos && data.media.videos.map(src => setVideo(src)).filter(k => k),
    socials: data.online && (() => {
      let arr = [];
      for(let key in data.online) {
        if (data.online[key]) {
          arr.push({
            src: data.online[key],
            type: key
          });
        }
      }
      return arr;
    })()
  }
};

// const AbortController = window.AbortController;

export const fetchCredits = (dataCredits) => {
  // this.controller = new AbortController();
  // const signal = this.controller.signal;

  return new Promise((resolve, reject) => {
    const keys = Object.keys(dataCredits).filter(key => !!dataCredits[key].length);
    Promise.all(
      keys.map(key => {
        let ob = {};
        ob.role = setCreditsRoleOption(key)
        ob.members = [];
        return Promise.all(
          dataCredits[key].map(id => 
            fetch(`${API_URL}/talent/${id}?projection={"name":1,"_nmdata":2}` /*, {signal}*/)
              .then(res => res.json())
          ))
          .then(data => {
            data.forEach(item =>
              ob.members.push({
                value: item._nmdata.appID,
                label: item.name
              }));
            return ob;
          });
      })
    )
      .then(data => resolve(data))
      .catch(err => reject(err))
  });
}

export const fetchFilmography = (filmography) => {
  return new Promise((res, rej) => {
    Promise.all(
      filmography.map(film => {
        const id = film.film;

        return fetch(`${API_URL}/film/${id}?projection={"title":1}`)
          .then(res => res.json())
          .then(data => ({
            roles: film.roles.map(role => setCreditsRoleOption(role)),
            film: {value: id, label: data.title}
          }))
      })
    )
      .then(data => res(data))
      .catch(err => rej(err));
  });
}

export default adjustFormData;