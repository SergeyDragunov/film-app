import { SEARCH_RESULTS } from '../../constants';

export const contentOptions = [
	{value: SEARCH_RESULTS.FILMS, label: 'Films'},
	{value: SEARCH_RESULTS.TALENT, label: 'Talent'},
	{value: SEARCH_RESULTS.FESTS, label: 'Festivals'}
];

export const movieCategories = [
	{value: 'short', label: 'Short films'},
	{value: 'documentary', label: 'Documentary'},
	{value: 'animation', label: 'Animation'}
];

export const festCategories = [
	{value: 'category 1', label: 'Category 1'},
	{value: 'category 2', label: 'Category 2'},
	{value: 'category 3', label: 'Category 3'}
];

export const genres = [
	{value: 'drama', label: 'Drama'},
	{value: 'comedy', label: 'Comedy'},
	{value: 'action', label: 'Action'},
	{value: 'horror', label: 'Horror'},
	{value: 'sci-fi', label: 'SCI-FI'}
];

export const roles = [
	{value: 'director', label: 'Director'},
	{value: 'producer', label: 'Producer'},
	{value: 'actor', label: 'Actor'},
	{value: 'writer', label: 'Writer'}
];

export const genders = [
	{value: 'M', label: 'Male'},
	{value: 'F', label: 'Female'}
];

let arr = [];

for(let i = 10; i > 0; i--) {
	arr.push({
		value: i,
		label: i === 10 ? '10' : `${i} and above`
	});
}

export const rating = arr;