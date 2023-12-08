const Test = require('../models/Test');

// add

async function addTest(test) {
	const newTest = await Test.create(test);

	await newTest.populate('author');

	return newTest;
}

// edit

async function editTest(id, test) {
	const newTest = await Test.findByIdAndUpdate(id, test, { returnDocument: 'after' });

	await newTest.populate('author');

	return newTest;
}

// delete

async function deleteTest(id) {
	await Test.deleteOne({ _id: id });

	//удалить также истории, связанные с тестом
}

// get list

async function getTests(author, limit = 8, page = 1) {
	const [tests, quantity] = await Promise.all([
		Test.find(author ? { author } : null)
			.populate('author')
			.limit(limit)
			.skip((page - 1) * limit),
		Test.countDocuments(author ? { author } : null),
	]);

	return {
		tests,
		lastPage: Math.ceil(quantity / limit),
	};
}

// get item

function getTest(id) {
	return Test.findById(id).populate('author');
}

module.exports = {
	addTest,
	editTest,
	deleteTest,
	getTests,
	getTest,
};
