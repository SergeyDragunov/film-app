import { SEARCH_RESULTS } from '../../constants';

export const adjustData = (data) => {
		const {
			budget,
			releaseDateUS, 
			runningTime, 
			keywords, 
			category,
			genres,
			country,
			credits,
			revenue
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
			info: country.name
		});

		if (budget) sideInfo.push({
			title: 'Budget',
			info: budget
		});

		if (revenue) sideInfo.push({
			title: 'Revenue',
			info: revenue
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
			info: releaseDateUS
		});

		if (runningTime) sideInfo.push({
			title: 'Run Time',
			info: runningTime
		});

		if (keywords && keywords.length) sideInfo.push({
			title: 'Plot Keywords',
			tags: keywords
		});

		return sideInfo;
	}