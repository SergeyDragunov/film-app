import moment from 'moment';

export default function (data) {
	let years = {};
	let validYear = {
		year: '',
		start_date: '',
		end_date: '',
		awards: [],
		nominations: [],
		mentions: []
	};
	for (let key in data) {
		if (/\d+/.test(key) && Object.keys(data[key]).length) {
			years[key] = data[key];
		}
	}

	let reversedYearsArr = Object.keys(years).reverse();

	for (let i = reversedYearsArr[0]; i >= reversedYearsArr[reversedYearsArr.length - 1]; i--) {
		if (years[i].start_date && years[i].end_date && years[i].awards.length) {
			validYear.year = i;
			validYear.start_date = moment(years[i].start_date).format('MMMM Do');
			validYear.end_date = moment(years[i].end_date).format('MMMM Do');

			for (let n = 0; n < years[i].awards.length; n++) {
				let award = years[i].awards[n];
				for (var a = 0; a < award.nominees.length; a++) {
					if (award.nominees[a].result === "Winner") {
						validYear.awards.push({
							type: 'award',
							title: award.award,
							id: award.nominees[a].film_id
						});
					} else if (award.nominees[a].result === "Nominee") {
						validYear.nominations.push({
							type: 'nomination',
							title: award.award,
							id: award.nominees[a].film_id
						});
					}
				}
			}

			break;
		}
	}
	return validYear;
}