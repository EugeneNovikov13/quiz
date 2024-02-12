const Test = require('../models/Test');

// add

async function addTest(test) {
	const newTest = await Test.create(test);

	await newTest.populate('author');

	return newTest;
}

// edit

async function editTest(id, test) {
	const newTest = await Test.findByIdAndUpdate(id, test, { returnDocument: 'after', runValidators: true });

	await newTest.populate('author');

	return newTest;
}

// delete

async function deleteTest(id) {
	await Test.deleteOne({ _id: id });
}

// get list

async function getTests(author, limit = 8, page = 1) {
	const [tests, quantity] = await Promise.all([
		Test.find(author ? { author } : {})
			.populate('author')
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip((page - 1) * limit),
		Test.countDocuments(author ? { author } : {}),
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

// get question of item

async function getQuestion(id, page) {
	const test = await Test.findById(id, { questions: 1 });

	return {
		question: test.questions[page - 1],
		lastPage: test.questions.length,
	};
}

module.exports = {
	addTest,
	editTest,
	deleteTest,
	getTests,
	getTest,
	getQuestion,
};
