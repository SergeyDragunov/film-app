import moment from 'moment';

// The Movie Database API parse

export default data => ({
	id: data.id,
	title: data.title,
	budget: Math.floor(data.budget / 1000000) + ' millions',
	revenue: Math.floor(data.revenue / 1000000) + ' millions',
	image: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
	synopsis: data.overview,
	year: moment(data.release_date).format('YYYY'),
	country: { name: data.production_countries[0].name, alpha3Code: data.production_countries[0].iso_3166_1},
	credits: data.credits,
	runningTime: data.runtime + ' min',
	category: data.category,
	genres: data.genres.map(item => item.name),
	language: data.original_language,
	releaseDateUS: moment(data.release_date).format('LL'),
	online: {website: data.homepage}
})