var https = require("https");
var fs = require('fs');
const fetch = require('node-fetch');

fs.unlink('log2.json');

const fileWriter = fs.createWriteStream('log3.json', {
	flags: 'a'
});

var username = "d54fd85b6f9069aba31619d6607b5f97";
var password = "98c26bf7af08801e53f5c94be8907363";
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

const getPrices = (page = 1) => {
	return fetch(`https://api.intrinio.com/prices?identifier=MSFT&start_date=1985_01_01&end_date=2017_03_01&page_size=50000&page_number=${page}`, {
		method: 'GET',
		headers: {
			"Authorization": auth
		}
	})
	.then(res => res.json());
};

const getPagesMap = (totalPages) => Array(totalPages - 1).fill().map((el, i) => i + 2);

getPrices()
	.then(initial => {
		const pages = initial.total_pages;
		if(pages > 1) {
			Promise.all(getPagesMap(pages).map(getPrices))
				.then(values => {
					return values.reduce((acc, value) => {
						acc.data = [...acc.data, ...value.data];
						return acc;
					}).data;
				})
				.then(data => {
					let prettifiedJson = JSON.stringify(data, null, '\t');
					fileWriter.write(prettifiedJson);
				});
		} else {
			let prettifiedJson = JSON.stringify(initial.data, null, '\t');
			fileWriter.write(prettifiedJson);
		}
	});