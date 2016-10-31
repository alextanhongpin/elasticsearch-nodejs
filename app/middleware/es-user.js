const esfactory = require('./elasticsearch-factory.js');


const index = 'users';
const type = 'user';



function createUserIndex() {
	return esfactory.createIndex(index);
}

function createUser(params) {
	return esfactory.addDocument(index, type, params);
}

function countUser() {
	return esfactory.countDocument(index, type);
}

function searchUser(params) {
	return esfactory.search(index, type, params);
}

module.exports = {
	createUserIndex,
	createUser,
	countUser,
	searchUser
} 