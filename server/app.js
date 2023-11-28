const express = require('express');
const mongoose = require('mongoose');
const { addQuestion, editQuestion, deleteQuestion, getQuestions, getQuestion } = require('./controllers/question');
const { addAnswer, editAnswer, deleteAnswer } = require('./controllers/answer');
const mapQuestion = require('./helpers/mapQuestion');
const mapAnswer = require('./helpers/mapAnswer');

const port = 3001;
const app = express();

app.use(express.json());

app.get('/questions', async (req, res) => {
	try {
		const questions = await getQuestions();

		res.send({ data: { questions: questions.map(mapQuestion) }, error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... There isn\'t questions' });
		console.log(e);
	}
});

app.get('/questions/:id', async (req, res) => {
	try {
		const question = await getQuestion(req.params.id);

		res.send({ data: mapQuestion(question), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This question isn\'t exist' });
		console.log(e);
	}
});

app.post('/questions', async (req, res) => {
	try {
		const newQuestion = await addQuestion({
			text: req.body.text,
		});

		res.send({ data: mapQuestion(newQuestion), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This question is already exists' });
		console.log(e);
	}
});

app.patch('/questions/:id', async (req, res) => {
	try {
		const updatedQuestion = await editQuestion(req.params.id, { text: req.body.text });

		res.send({ data: mapQuestion(updatedQuestion), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error. Failed to update questions' });
		console.log(e);
	}
});

app.delete('/questions/:id', async (req, res) => {
	try {
		await deleteQuestion(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: 'Error. Failed to delete question' });
		console.log(e);
	}
})

app.post('/questions/:id/answers', async (req, res) => {
	try {
		const newAnswer = await addAnswer(req.params.id, {
			text: req.body.text,
			isCorrect: req.body.isCorrect,
		});

		res.send({ data: mapAnswer(newAnswer), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This answer is already exists' });
		console.log(e);
	}
})

app.patch('/answers/:id', async (req, res) => {
	try {
		const updatedAnswer = await editAnswer(req.params.id, {
			text: req.body.text,
			isCorrect: req.body.isCorrect,
		});

		res.send({ data: mapAnswer(updatedAnswer), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error. Failed to update answer' });
		console.log(e);
	}
});

app.delete('/questions/:questionId/answers/:answerId', async (req, res) => {
	try {
		await deleteAnswer(req.params.questionId, req.params.answerId);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: 'Error. Failed to delete answer' });
		console.log(e);
	}
})

mongoose.connect(
	'mongodb+srv://NovikovEugene:gfhjkm13@educationdb.nioilpj.mongodb.net/quiz?retryWrites=true&w=majority',
).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port}`);
	});
});
