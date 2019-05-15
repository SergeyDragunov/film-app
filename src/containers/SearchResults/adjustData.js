import moment from 'moment';

import { setCountry, setRunningTime } from '../../utils';
import { SEARCH_RESULTS,  } from '../../constants';

const roleOptions = [
	{value: 'director', label: 'Director'},
	{value: 'writer', label: 'Writer'},
	{value: 'producer', label: 'Producer'},
	{value: 'cast', label: 'Actor'},
	{value: 'dop', label: 'Cinematographer'},
	{value: 'editor', label: 'Editor'},
	{value: 'productionDesigner', label: 'Production Designer'},
	{value: 'costumeDesigner', label: 'Costume Designer'},
	{value: 'music', label: 'Music'},
	{value: 'sound', label: 'Sound'},
];

const setRole = role => roleOptions.map(opt => opt.value === role ? opt.label : false).filter(k => k)[0];

const adjustData = (data, type) => {
	switch(type) {
		case SEARCH_RESULTS.FILMS: {
			return data.map((film, i) => {
				return {
					id: film._nmdata.appID,
					title: film.title,
					image: film.media && film.media.moviePoster.medium,
					synopsis: film.synopsis,
					description: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					year: film.year,
					country: { name: setCountry(film.country), alpha3Code: film.country},
					credits: film.credits,
					runTime: film.runningTime && setRunningTime(film.runningTime),
					category: film.category,
					genres: film.genres,
					language: film.language,
					release: film.releaseDateUS ? moment(film.releaseDateUS).format('LL') : null
				}
			});
		}
		case SEARCH_RESULTS.FESTS: {
			return data.map((fest, i) => {
				return {
					id: fest._nmdata.appID,
					title: fest.name,
					image: fest.media.festivalPoster ? fest.media.festivalPoster.medium : '',
					description: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity...",
					website: fest.online.website,
					dates: fest[2017].start_date ? 
									`${moment(fest[2017].start_date).format('LL')} - ${moment(fest[2017].end_date).format('LL')}` 
									: '',
					country: { name: setCountry(fest.country), alpha3Code: fest.country },
					accredited: fest.accredited,
					category: i % 2 ? ['category 1', 'category 2'] : 
										i % 3 ? ['category 1'] : ['category 2', 'category 3']
				}
			});
		}
		case SEARCH_RESULTS.TALENT: {
			return data.map((talent, i) => {
				return {
					id: talent._nmdata.appID,
					name: talent.name,
					sortName: talent._nmdata.sortName,
					image: talent.media.headshot ? talent.media.headshot.medium : '',
					gender: talent.gender,
					country: { name: setCountry(talent.country), alpha3Code: talent.country },
					biography: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					birthDate: '10th October 1982',
					roles: talent.roles.map(role => setRole(role)),
					year: '1982'
				}
			});
		}
		default: {
			return [];
		}
	}
}

export default adjustData;