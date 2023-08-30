const puppeteer = require('puppeteer');
const { readFileSync, writeFileSync } = require('fs');

const theatres = JSON.parse(
	readFileSync('../get theatres/theatre.json', { encoding: 'utf-8' })
);

let showings = [];

async function search(browser, theatre) {
	const page = await browser.newPage();
	const url = `https://www.uecmovies.com/theatres/details/${theatre.id}`;
	console.log('going to ', theatre.name);
	await page.goto(url);

	const dates = await page.$$eval('select#showdate > option', (els) => {
		return [...els].map((x) => x.value);
	});
	console.log('processing ', theatre.name);

	for (const date of dates) {
		await page.goto(`${url}?showdate=${date}`);

		const response = await page.$$eval(
			'#now-playing > li',
			(els, { theatre_id, date }) => {
				const result = [];

				for (const el of [...els]) {
					const movie_id = el
						.querySelector('.movieTimes > .movieTimesLeft > a')
						.href.split('/')
						.at(-1);

					for (const time of el.querySelectorAll(
						'.auditoriumStyleShowtimes > span'
					)) {
						const [t, halve] = time.innerText.split(' ');
						const [hour, minute] = t.split(':');

						const hoursToAdd = halve === 'PM' ? 12 : 0;
						const hours = 60 * (Number(hour) + hoursToAdd);

						const timestamp = 60000 * (Number(minute) + hours);

						result.push({
							movie_id,
							theatre_id,
							date,
							time: timestamp,
						});
					}
				}

				return result;
			},
			{ theatre_id: theatre.id, date }
		);

		showings = [...showings, ...response];
	}

	console.log('done ', theatre.name);
}

async function main() {
	const browser = await puppeteer.launch({ headless: 'new' });

	console.log('starting');

	let searches = [];

	for (const theatre of theatres) {
		if (searches.length > 0) {
			await Promise.all(searches);

			searches = [];
		}

		await search(browser, theatre);

		console.log(showings);
	}

	console.log('finsihed');

	writeFileSync('./showings.json', JSON.stringify(showings, null, 4));

	browser.close();
}

main();
