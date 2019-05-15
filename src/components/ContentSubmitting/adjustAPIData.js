import { SEARCH_RESULTS } from '../../constants';

const film = {
	title: '',
	altTitle: '',
	synopsis : '',
	credits: {
		director: [],
		writer: [],
		producer: [],
		dop: [],
		editor: [],
		productionDesigner: [],
		costumeDesigner: [],
		music: [],
		sound: [],
		cast: []
	},
	year: '',
	releaseDateUS: '',
	country: '',
	language: '',
	runningTime: '',
	category: [],
	online: {
		website: '',
		imdb: '',
		facebook: '',
		twitter: '',
		tumblr: '',
		vimeo: '',
		youtube: '',
		instagram: '',
		wikipedia: ''
	},
	media: {
		moviePoster: {
			full: '',
			medium: '',
			small: ''
		},
		trailer: '',
		movie: '',
		images: [],
		videos: []
	},
	genres: [],
	keywords: [],
	awards: []
};

const talent = {
	name: '',
	gender: '',
	dob: null,
	country: '',
	state: '',
	bio: '',
	filmSchool: null,
	online: {
		email: '',
		website: '',
		imdb: '',
		facebook: '',
		twitter: '',
		tumblr: '',
		google: '',
		linkedin: '',
		vimeo: '',
		youtube: '',
		instagram: '',
		wikipedia: ''
	},
	media: {
		headshot: {
			full: '',
			medium: '',
			small: ''
		},
		videos: [],
		images: []
	},
	roles: [],
	filmography: [],
	awards: [],
	keywords: []
};

const adjustData = (data, content) => {
	if (data && content) {
		for (let key in data) {
			if (typeof data[key] === 'string') {
				data[key] = data[key].trim();
			}
		}

		switch (content) {
			case SEARCH_RESULTS.FILMS: {
				let newFilm = {
					title: data.title || film.title,
					altTitle: data.altTitle || film.altTitle,
					synopsis: data.synopsis || film.synopsis,
					credits: film.credits,
					year: data.releaseDateUS ? new Date(data.releaseDateUS).getFullYear() + "" : film.year,
					releaseDateUS: data.releaseDateUS ? new Date(data.releaseDateUS).toISOString() : film.releaseDateUS,
					country: data.country ? data.country.value : film.country,
					language: data.language ? data.language.value : film.language,
					runningTime: data.runningTime || film.runningTime, 
					category: data.category && !!data.category.length ? data.category.map(item => item.value) : film.category,
					online: film.online,
					media: {
						moviePoster: {
							full: data.poster || film.media.moviePoster.full,
							medium: data.poster || film.media.moviePoster.medium,
							small: data.poster || film.media.moviePoster.small
						},
						trailer: data.trailer || film.media.trailer,
						movie: data.movie || film.media.movie,
						images: data.images && !!data.images.length ? data.images.map(img => img.src) : film.media.images,
						videos: data.videos && !!data.videos.length ? data.videos.map(video => video.src) : film.media.videos
					},
					genres: data.genres && !!data.genres.length ? data.genres.map(item => item.value) : film.genres,
					keywords: data.keywords && !!data.keywords.length ? data.keywords.map(item => item.value.trim()) : film.keywords,
					awards: data.awards && !!data.awards.length ? data.awards : film.awards
				};

				if (data.socials && data.socials.length) 
					data.socials.forEach(item => film.online[item.type] = item.src);
				
				if (data.credits && data.credits.length) {
					let credits = film.credits;
					data.credits.forEach(item => 
						credits[item.role.value] = item.members.map(member => member.value)
					);
					newFilm.credits = credits;
				}

				return newFilm;
			}
			case SEARCH_RESULTS.TALENT: {
				console.log()
				let newTalent = {
					name: (data.firstName + " " + data.lastName) || talent.name,
					gender: data.gender ? data.gender.value : talent.gender,
					dob: data.dob ? new Date(data.dob).toISOString() : talent.dob,
					country: data.country ? data.country.value : talent.country,
					state: data.state ? data.state.value : talent.state,
					bio: data.bio || talent.bio,
					filmSchool: data.filmSchool || talent.filmSchool,
					online: talent.online,
					media: {
						headshot: {
							full: data.photo || talent.media.headshot.full,
							medium: data.photo || talent.media.headshot.medium,
							small: data.photo || talent.media.headshot.small
						},
						images: data.images && !!data.images.length ? data.images.map(img => img.src) : talent.media.images,
						videos: data.videos && !!data.videos.length ? data.videos.map(video => video.src) : talent.media.videos
					},
					roles: data.roles && !!data.roles.length ? data.roles.map(item => item.value) : talent.roles,
					filmography: talent.filmography,
					awards: data.awards && !!data.awards.length ? data.awards : talent.awards,
					keywords: data.keywords && !!data.keywords.length ? data.keywords.map(item => item.value) : talent.keywords
				};

				if (data.socials && data.socials.length) 
					data.socials.forEach(item => talent.online[item.type] = item.src);

				if (data.filmography && data.filmography.length) {
					newTalent.filmography = data.filmography.map(film => ({
						roles: film.roles.map(({ value }) => value),
						film: film.film.value
					}))
				}

				return newTalent;
			}
			default: {
				return null
			}
		}
	}
}

export default adjustData;