const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login, updateUser } = require('./controllers/user');
const { addTest, editTest, deleteTest, getTests, getTest, getQuestion } = require('./controllers/test');
const { addHistory, deleteHistory, getHistories } = require('./controllers/history');
const authenticated = require('./middlewares/authenticated');
const mapUser = require('./helpers/mapUser');
const mapTest = require('./helpers/mapTest');
const mapHistory = require('./helpers/mapHistory');
const mapQuestion = require('./helpers/mapQuestion');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		if (e.code === 11000) {
			res.send({ error: 'Пользователь с такой почтой уже зарегистрирован' });
			return;
		}
		res.send({ error: e || 'Unknown error' });
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

app.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true })
		.send({})
});

app.get('/tests', async (req, res) => {
	try {
		const { tests, lastPage } = await getTests(
			req.query?.user === 'null' ? null : req.query?.user,
			req.query?.limit,
			req.query?.page,
		);

		res.send({ data: {lastPage, tests: tests.map(mapTest) }, error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... There isn\'t tests' });
		console.log(e);
	}
});

app.use(authenticated);

app.patch('/users', async (req, res) => {
	try {
		const updatedUser = await updateUser(req.user.id, {
			name: req.body?.name,
			surname: req.body?.surname,
			email: req.body?.email,
			image: req.body?.image,
		});

		res.send({ data: mapUser(updatedUser), error: null });
	} catch (e) {
		let error = 'Error. Failed to update user';
		if (e.code === 11000) {
			error = 'Пользователь с таким адресом электронной почты уже существует';
		}
		res.send({ data: null, error });
		console.log(e);
	}
});

app.get('/tests/:id', async (req, res) => {
	try {
		const test = await getTest(req.params.id);

		res.send({ data: mapTest(test), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This test isn\'t exist' });
		console.log(e);
	}
});

app.get('/tests/:id/questions/:page', async (req, res) => {
	try {
		const { question, lastPage } = await getQuestion(req.params.id, req.params.page);

		res.send({ data: { question: mapQuestion(question), lastPage }, error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This question isn\'t exist' });
		console.log(e);
	}
});

app.post('/tests', async (req, res) => {
	try {
		const newTest = await addTest({
			title: req.body.title,
			questions: req.body.questions,
			author: req.user.id,
		});

		res.send({ data: mapTest(newTest), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This test\'s title is already exists' });
		console.log(e);
	}
});

app.patch('/tests/:id', async (req, res) => {
	try {
		const updatedTest = await editTest(req.params.id, {
			title: req.body.title,
			questions: req.body.questions,
		});

		res.send({ data: mapTest(updatedTest), error: null });
	} catch (e) {
		let error = 'Error. Failed to update test';
		if (e.code === 11000) {
			error = 'Тест с таким названием уже существует';
		}
		res.send({ data: null, error });
		console.log(e);
	}
});
app.delete('/tests/:id', async (req, res) => {
	try {
		await deleteTest(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: 'Error. Failed to delete test' });
		console.log(e);
	}
});

app.get('/histories/:id', async (req, res) => {
	try {
		const histories = await getHistories(req.params.id);

		res.send({ data: histories.map(mapHistory), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Can\'t get histories' });
		console.log(e);
	}
});

app.post('/histories', async (req, res) => {
	try {
		const newHistory = await addHistory({
			user: req.user.id,
			test: req.body.test,
			results: req.body.results,
		});

		res.send({ data: mapHistory(newHistory), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Creation of history is impossible' });
		console.log(e);
	}
});

app.delete('/histories/:id', async (req, res) => {
	try {
		await deleteHistory(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: 'Error. Failed to delete histories' });
		console.log(e);
	}
});

mongoose.connect(
	'mongodb+srv://NovikovEugene:gfhjkm13@educationdb.nioilpj.mongodb.net/quiz2?retryWrites=true&w=majority',
).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port}`);
	});
});
