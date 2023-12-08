//add

const History = require('../models/History');

function addHistory(history) {
	return History.create(history);
}

//delete along with test

async function deleteHistory(id) {
	await History.deleteMany({ test: id });
}

// get list by test id

function getHistories(id) {
	return History.find({ test: id })
		.populate('user', { name: 1, surname: 1 });
}

module.exports = {
	addHistory,
	deleteHistory,
	getHistories,
};
