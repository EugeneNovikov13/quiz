//add

const History = require('../models/History');

async function addHistory(history) {
	const newHistory = await History.create(history);

	await newHistory.populate('user', { name: 1, surname: 1 });

	return newHistory;
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
