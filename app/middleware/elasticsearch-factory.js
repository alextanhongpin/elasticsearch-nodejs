const client = require('./elasticsearch.js');


// Health
function checkHealth() {
	client.cluster.health({}, function(err, resp, status) {
		console.log('--Client Health--', resp);
	});
}

// Create Index
function createIndex(index) {
	return new Promise((resolve, reject) => {
		client.indices.create({ index }, (err, resp, status) => {
			if (err) {
				reject(err);
			} else {
				console.log('create', resp);
				resolve(resp);
			}
		});
	});
}

// Delete Index
function deleteIndex(index) {
	client.indices.delete({ index }, (err, resp, status) => {
		console.log('delete', resp);
	});
}

// Add a new document
function addDocument(index, type, body) {
	return new Promise((resolve, reject) => {
		client.index({
			index, // equivalent to database in nosql
			// id: '1', if no id is specified, es will generate one automatically
			type, // equivalent to collection in nosql
			body, // the object to be stored
		}, (err, resp, status) => {
			if (err) {
				reject(err);
			} else {
				console.log('add document', resp);
				resolve(resp);
			}
		});
	});
}

// Count the document by type
function countDocument(index, type) {
	return new Promise((resolve, reject) => {
		client.count({
			index,
			type
		}, (err, resp, status) => {
			if (err) {
				reject(err);
			} else {
				console.log(type, resp);
				resolve(resp);
			}
		});
	});
}

// Delete a document
function removeDocument(index, id, type) {
	client.delete({
		index,
		id,
		type
	}, (err, resp, status) => {
		console.log(resp);
	});
}

function addDocuments(index, type, documents) {
	const body = {
		index: {
			_index: index,
			_type: type
		}
	}
	client.bulk({
		index,
		type,
		body
	});
}

function ping() {
	client.ping({
		requestTimeout: Infinity,
		hello: 'elasticsearch'
	}, (err) => {
		if (err) {
			console.trace('elasticsearch cluster is down.');
		} else {
			console.log('All is well');
		}
	});
}

function search(index, type, body) {
	return new Promise((resolve, reject) => {
		client.search({index, type, body}, (err, resp, status) => {
			if (err) {
				console.log('search error: ' + err);
				reject(err);
			} else {
				resolve(resp);
			}
		});
	});
}



module.exports = {
	checkHealth,
	createIndex,
	deleteIndex,
	addDocument,
	countDocument,
	removeDocument,
	addDocuments,
	ping,
	search
}

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