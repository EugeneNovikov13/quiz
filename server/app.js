const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login } = require('./controllers/user');
const { addTest, editTest, deleteTest, getTests, getTest } = require('./controllers/test');
const authenticated = require('./middlewares/authenticated');
const mapUser = require('./helpers/mapUser');
const mapTest = require('./helpers/mapTest');

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

app.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true })
		.send({})
		// TODO: разобраться работает ли redirect на клиенте
		.redirect('/');
});

app.get('/tests', async (req, res) => {
	try {
		const { tests, lastPage } = await getTests(
			req.query?.user,
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

app.get('/tests/:id', async (req, res) => {
	try {
		const test = await getTest(req.params.id);

		res.send({ data: mapTest(test), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This test isn\'t exist' });
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
		res.send({ data: null, error: 'Error. Failed to update test' });
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

mongoose.connect(
	'mongodb+srv://NovikovEugene:gfhjkm13@educationdb.nioilpj.mongodb.net/quiz2?retryWrites=true&w=majority',
).then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port}`);
	});
});
