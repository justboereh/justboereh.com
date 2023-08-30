const puppeteer = require('puppeteer');
const { writeFileSync } = require('fs');
let movies = [];

async function DoNowPlaying(browser) {
	const page = await browser.newPage();

	let moviesToProcess = [];

	for (const url of ['nowplaying', 'comingsoon', 'specialevents']) {
		await page.goto(`https://www.uecmovies.com/movies/${url}`);

		const urlMovies = await page.$$eval(
			'a',
			(els, url) => {
				return [...els].map((el) => ({
					title: el.getAttribute('title'),
					id: Number(el.href.split('/').at(-1)),
					poster: el.querySelector('img').src,
					special: url === 'specialevents',
				}));
			},
			url
		);

		moviesToProcess = [...moviesToProcess, ...urlMovies];
	}

	for (const movie of moviesToProcess) {
		if (!!movies.find((x) => x.id === movie.id)) continue;

		console.log('doing ', movie.title);

		await page.goto(`https://www.uecmovies.com/movies/details/${movie.id}`);

		movie.description = await page.$eval(
			'#movie-details p.movie-synopsis',
			(x) => x.innerText
		);

		movie.genre = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(1)',
			(el) => el.innerText.split(',').map((x) => x.trim())
		);

		movie.released = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(2)',
			(el) =>
				el.innerText
					.split(' ')
					.slice(2)
					.map((x) => x.trim())
					.join(' ')
					.trim()
		);

		movie.mpaa = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(3)',
			(el) => el.innerText.split(' ')[2].trim()
		);

		movie.runtime = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(4)',
			(el) => Number(el.innerText.split(' ')[1])
		);

		movie.director = await page.$eval(
			'#movie-details div.movie-info:nth-of-type(2) > span',
			(el) =>
				el.innerText
					.slice(9)
					.split(',')
					.map((x) => x.trim())
		);

		movie.actors = await page.$eval(
			'#movie-details div.movie-info:nth-of-type(3) > span',
			(el) =>
				el.innerText
					.slice(7)
					.split(',')
					.map((x) => x.trim())
		);

		try {
			movie.youtube = await page.$eval(
				'#movie-details div.videoSlide > iframe',
				(el) => el.src
			);
		} catch (error) {}

		console.log('done', movie.title);

		movies.push(movie);
	}
}

async function main() {
	const browser = await puppeteer.launch({ headless: 'new' });

	console.log('browser created');

	await DoNowPlaying(browser);

	writeFileSync('./movies.json', JSON.stringify(movies, null, 4));

	browser.close();
}

main();
