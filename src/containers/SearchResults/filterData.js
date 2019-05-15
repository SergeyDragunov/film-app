import { SEARCH_RESULTS } from '../../constants';

const filterData = ({ filters, content, data }) => {
	if (Object.keys(filters).length) {
		switch(content) {
			case SEARCH_RESULTS.FILMS: {
				return data.filter(movie => {
					let filtered = true;
					outer: for(let key in filters) {
						if(key === 'title' && 
							!movie.title.toLowerCase().includes(filters[key].toLowerCase())) {
							filtered = false;
							break;
						} else if (key === 'category' || key === 'genres') {
							if(movie[key]) {
								for(let i = 0; i < movie[key].length; i++) {
									if(filters[key].includes(movie[key][i].toLowerCase())) {
										continue outer;
									} else {
										continue;
									}
								}
							}
							filtered = false;
						} else if (key === 'country' && movie[key].alpha3Code !== filters[key]) {
							filtered = false;
							break;									
						} else if (key === 'release') {
							let year = filters[key].split(',');
							const fromYear = year[0] ? year[0] : 1900;
							const toYear = year[1] ? year[1] : 2020;
							
							if(!(movie.year >= fromYear && movie.year < toYear)) {
								filtered = false;
								break;
							}
						}
					}
					return filtered;
				});
			}
			case SEARCH_RESULTS.TALENT: {
				return data.filter(celeb => {
					let filtered = true
					outer: for(let key in filters) {
						if(key === 'name' 
							&& !celeb.name.toLowerCase().includes(filters[key].toLowerCase())) {
							filtered = false;
						} else if (key === 'role') {
							for(let i = 0; i < celeb[key].length; i++) {
								if(filters[key].includes(celeb[key][i].toLowerCase())) {
									continue outer;
								} else {
									continue;
								}
							}
							filtered = false;
						} else if (key === 'country' 
							&& celeb[key].alpha3Code !== filters[key]) {
							filtered = false;									
						} else if (key === 'gender' 
							&& celeb[key] !== filters[key]) {
							filtered = false;									
						} else if (key === 'birth') {
							let year = filters[key].split(',');
							const fromYear = year[0] ? year[0] : 1900;
							const toYear = year[1] ? year[1] : 2020;
							
							if(!(celeb.year >= fromYear && celeb.year < toYear)) {
								filtered = false;
								break;
							}
						}
					}
					return filtered;
				});
			}
			case SEARCH_RESULTS.FESTS: {
				return data.filter(item => {
					let filtered = true;
					outer: for(let key in filters) {
						if(key === 'title' && 
							!item.title.toLowerCase().includes(filters[key].toLowerCase())) {
							filtered = false;
							break;
						} else if (key === 'category') {
							for(let i = 0; i < item[key].length; i++) {
								if(filters[key].includes(item[key][i].toLowerCase())) {
									continue outer;
								} else {
									continue;
								}
							}
							filtered = false;
						} else if (key === 'country' && item[key].alpha3Code !== filters[key]) {
							filtered = false;
							break;
						} else if (key === 'accredited') {
							const itemData = item[key].map(key => key.toLowerCase());
							const filterArr = filters[key].split(',');

							for(let i = 0; i < filterArr.length; i++) {
								if(!itemData.includes(filterArr[i])) {
									filtered = false;
									break;
								}
							}

						}
					}
					return filtered;
				});
			}
			default: {
				return data;
			}
		}

	} else {
		return data;
	}
}

export default filterData;