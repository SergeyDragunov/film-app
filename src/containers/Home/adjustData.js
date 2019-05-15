export default data => data.map((item, index) => ({
	id: item.id,
	title: item.title || item.name,
	image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
	"category": index % 4 ? "SCI-FI" : index % 3 ? "DRAMA" : index % 2 ? "COMEDY" : "DOCUMENTARY",
	target: '/film/' + item.id
}))
