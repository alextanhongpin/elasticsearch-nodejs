const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});


module.exports = client;


// client.cluster.health({}, function(err, resp, status) {
// 	console.log('--Client Health--', resp);
// });


// Create index
//client.indices.create

// client.ping({
// 	requestTimeout: Infinity,,
// 	hello: 'elasticsearch'
// }, function(err) {
// 	if (err) {
// 		console.trace('elasticsearch cluster is down.');
// 	} else {
// 		console.log('All is well');
// 	}
// });

