const express = require('express');
const app = express();

const PORT = 3000;

// Elasticsearch user model
const user = require('./app/middleware/es-user.js');



function pnow(prom, param) {

	return (req, res, next) => {
		return prom(param).then((data) => {
			res.status(200).json(data)
		}).catch((err) => {
			res.status(400).json(err);
		});
	}
	
}

// http://localhost:9200/users/user/_search?query=baby.doe

app.get('/create_user_index', pnow(user.createUserIndex));

app.get('/create_user', pnow(user.createUser, {
	first_name: 'john',
	last_name: 'baby doe',
	email: 'john.baby.doe@mail.com',
	location: 'new york'
}));

app.get('/count_user', pnow(user.countUser));

app.get('/search', pnow(user.searchUser, {
	query: {
		match: {
			_all: 'john'
		}
	}
}));


app.get('/', (req, res) => {

	res.status(200).json({
		hello: 'world'
	});


	// elasticsearchClient.search({
	// 	index: 'tweet',
	// 	type: 'tweet',
	// 	body: {
	// 		query: {
	// 			match: {
	// 				source: req.query.search
	// 			}
	// 		}
	// 	}
	// }).then(function(resp) {
	// 	var hits = resp.hits.hits;
	// 	return res.status(200).json(resp);
	// }, function(err) {
	// 	console.trace(err.message);
	// });
});



app.listen(PORT, () => {
	console.log(`Listening to port*: ${ PORT }. Press ctrl + c to cancel.`);
});