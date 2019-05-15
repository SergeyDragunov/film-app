export default function (data) {
	let years = {};
	let validYears = {};

	for (let key in data) {
		if (/\d+/.test(key) && Object.keys(data[key]).length) {
			years[key] = data[key];
		}
	}

	for (let key in years) {
		if (years[key].start_date || years[key].end_date || years[key].awards.length) {
			validYears[key] = {
				awards: [],
				nominations: [],
				mentions: []
			};
			for (let n = 0; n < years[key].awards.length; n++) {
				let award = years[key].awards[n];
				for (var a = 0; a < award.nominees.length; a++) {
					if (award.nominees[a].result === "Winner") {
						validYears[key].awards.push({
							type: 'award',
							title: award.award,
							id: award.nominees[a].film_id
						});
					} else if (award.nominees[a].result === "Nominee") {
						validYears[key].nominations.push({
							type: 'nomination',
							title: award.award,
							id: award.nominees[a].film_id
						});
					}
				}
			}
		}
	}

	let lastYear = Object.keys(validYears)[Object.keys(validYears).length - 1];

	delete validYears[lastYear];

	return validYears;
}