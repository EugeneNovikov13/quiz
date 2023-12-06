const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login } = require('./controllers/user');
const mapUser = require('./helpers/mapUser');
const mapQuestion = require('./helpers/mapQuestion');

const port = 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
})

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

// app.get('/questions', async (req, res) => {
// 	try {
// 		const { questions, lastQuestionNumber } = await getQuestions(
// 			req.query?.limit,
// 			req.query?.page,
// 		);
//
// 		res.send({ data: {lastQuestionNumber, questions: questions.map(mapQuestion) }, error: null });
// 	} catch (e) {
// 		res.send({ data: null, error: 'Error! Maybe... There isn\'t questions' });
// 		console.log(e);
// 	}
// });
//
// app.get('/questions/:id', async (req, res) => {
// 	try {
// 		const question = await getQuestion(req.params.id);
//
// 		res.send({ data: mapQuestion(question), error: null });
// 	} catch (e) {
// 		res.send({ data: null, error: 'Error! Maybe... This question isn\'t exist' });
// 		console.log(e);
// 	}
// });
//
// app.post('/questions', async (req, res) => {
// 	try {
// 		const newQuestion = await addQuestion({
// 			text: req.body.text,
// 			correctAnswer: req.body.correctAnswer,
// 			answers: req.body.answers.map(answer => ({
// 				text: answer,
// 			})),
// 		});
//
// 		res.send({ data: mapQuestion(newQuestion), error: null });
// 	} catch (e) {
// 		res.send({ data: null, error: 'Error! Maybe... This question is already exists' });
// 		console.log(e);
// 	}
// });
//
// app.patch('/questions/:id', async (req, res) => {
// 	try {
// 		const updatedQuestion = await editQuestion(req.params.id, {
// 			text: req.body?.text,
// 			correctAnswer: req.body?.correctAnswer,
// 			answers: req.body?.answers.map(answer => ({
// 				text: answer,
// 			})),
// 		});
//
// 		res.send({ data: mapQuestion(updatedQuestion), error: null });
// 	} catch (e) {
// 		res.send({ data: null, error: 'Error. Failed to update questions' });
// 		console.log(e);
// 	}
// });
//
// app.delete('/questions/:id', async (req, res) => {
// 	try {
// 		const { lastQuestionNumber } = await getQuestions();
// 		if (lastQuestionNumber > 1) {
// 			await deleteQuestion(req.params.id);
//
// 			res.send({ error: null });
// 			return;
// 		}
// 		res.send({ error: 'Error. You can\'t delete the last question' });
// 	} catch (e) {
// 		res.send({ error: 'Error. Failed to delete question' });
// 		console.log(e);
// 	}
// })

mongoose.connect(
	'mongodb+srv://NovikovEugene:gfhjkm13@educationdb.nioilpj.mongodb.net/quiz2?retryWrites=true&w=majority',
).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port}`);
	});
});
