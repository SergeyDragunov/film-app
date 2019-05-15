// import moment from 'moment';

const adjustData = (data) => 
	data.map((item, i) => ({
		id: 1,
		title: item.title,
		media: {smallImage: item.image},
		category: item.category,
		// date: moment(item.date).format('DD MMM YYYY'),
		text: item.description,
		tags: i % 2 ? ['Batman', 'Fast & Furious', 'Dead Walker'] :
					i % 3 ? ['Film', 'King'] :
					['Fast & Furious', 'Homeland'],
		author: item.author
	}))

export default adjustData;