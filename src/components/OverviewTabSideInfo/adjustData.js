import moment from 'moment';

import { countriesDB } from '../../utils/countriesDB';
import { setRunningTime } from '../../utils';
import { SEARCH_RESULTS,  } from '../../constants';

const setCountry = (countryCode) => {
	let countyName;
	for(let i = 0; i < countriesDB.length; i++) {
		if(countryCode === countriesDB[i].alpha3Code) countyName = countriesDB[i].name; 
	}

	return countyName;
}

export const adjustData = (data) => {
		const { 
			releaseDateUS, 
			runningTime, 
			keywords, 
			category,
			genres,
			country,
			credits
		} = data;

		let sideInfo = []

		if (credits) {
			sideInfo = Object.keys(credits).map((key, i) => {
				if(credits[key].length && key !== 'cast') {
					return {
						title: key,
						ids: credits[key]
					}
				}
				return false;
			}).filter(key => key);
		}

		if  (country) sideInfo.push({
			title: 'Country',
			info: setCountry(country) ? setCountry(country) : country
		});

		if (category && category.length) sideInfo.push({
			title: 'Categories',
			links: category.map(key => ({
				path: {
					pathname: `/${SEARCH_RESULTS.PAGE}/${SEARCH_RESULTS.FILMS}`,
					search: `?category=${key}`
				},
				name: key
			}))
		});

		if (genres && genres.length) sideInfo.push({
			title: 'Genres',
			links: genres.map(key => ({
				path: {
					pathname: `/${SEARCH_RESULTS.PAGE}/${SEARCH_RESULTS.FILMS}`,
					search: `?genres=${key}`
				},
				name: key
			}))
		});

		if (releaseDateUS) sideInfo.push({
			title: 'Release Date',
			info: moment(releaseDateUS).format('LL')
		});

		if (runningTime) sideInfo.push({
			title: 'Run Time',
			info: setRunningTime(runningTime)
		});

		if (keywords && keywords.length) sideInfo.push({
			title: 'Plot Keywords',
			tags: keywords
		});

		return sideInfo;
	}