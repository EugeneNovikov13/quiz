if (process.env.NODE_ENV === 'development') require('dotenv').config();

import { join } from 'path';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import cookieParser from 'cookie-parser';
import { login, register, updateUser } from './controllers/user';
import { addTest, deleteTest, editTest, getQuestion, getTest, getTests } from './controllers/test';
import { addHistory, deleteHistory, getHistories } from './controllers/history';
import authenticated from './middlewares/authenticated';
import mapUser from './helpers/mapUser';
import mapTest from './helpers/mapTest';
import mapHistory from './helpers/mapHistory';
import mapQuestion from './helpers/mapQuestion';
import {
	IAddHistoryRequestBody,
	IAddTestRequestBody,
	IMappedHistory,
	IMappedQuestion,
	IMappedTest,
	IMappedUser,
	IResponseBody,
	ITestList,
	ITestRequestQuery,
	IUpdateUserRequestBody,
	IUser,
	RequestWithBody,
	RequestWithParams,
	RequestWithParamsAndBody,
	RequestWithQuery,
} from './types';

const app = express();

app.use(express.static('../client/build'));

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (
	req: RequestWithBody<IUser>,
	res: Response<IResponseBody<IMappedUser>>,
) => {
	try {
		const { user, token } = await register(req.body);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, data: mapUser(user) });
	} catch (e) {
		if (e instanceof MongoError && e.code === 11000) {
			res.send({ data: null, error: 'Пользователь с такой почтой уже зарегистрирован' });
			return;
		}
		if (e instanceof Error) {
			res.send({ data: null, error: e.message || 'Не удалось зарегистрировать пользователя' });
		}
	}
})

app.post('/login', async (
	req: RequestWithBody<Pick<IUser, 'email' | 'password'>>,
	res: Response<IResponseBody<IMappedUser>>,
) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, data: mapUser(user) });
	} catch (e) {
		if (e instanceof Error) {
			res.send({ data: null, error: e.message || 'Unknown error-message' });
		}
	}
});

app.post('/logout', (_, res: Response) => {
	res.cookie('token', '', { httpOnly: true })
		.send({})
});

app.get('/tests', async (
	req: RequestWithQuery<ITestRequestQuery>,
	res: Response<IResponseBody<ITestList>>,
) => {
	try {
		const { tests, lastPage } = await getTests(
			req.query?.user,
			+req.query?.limit,
			+req.query?.page,
		);

		res.send({ data: {lastPage, tests: tests.map(mapTest) }, error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... There isn\'t tests' });
		console.log(e);
	}
});

app.use(authenticated);

app.patch('/users', async (
	req: RequestWithBody<IUpdateUserRequestBody>,
	res: Response<IResponseBody<IMappedUser>>,
) => {
	try {
		const updatedUser = await updateUser(req.body.user.id, {
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			image: req.body.image,
		});
		if (updatedUser) {
			res.send({ data: mapUser(updatedUser), error: null });
		}
	} catch (e) {
		let error = 'Error. Failed to update user';
		if (e instanceof MongoError && e.code === 11000) {
			error = 'Пользователь с таким адресом электронной почты уже существует';
		}
		res.send({ data: null, error });
		console.log(e);
	}
});

app.get('/tests/:id', async (
	req: RequestWithParams<{ id: string }>,
	res: Response<IResponseBody<IMappedTest>>,
) => {
	try {
		const test = await getTest(req.params.id);

		if (test) {
			res.send({ data: mapTest(test), error: null });
		}
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This test isn\'t exist' });
		console.log(e);
	}
});

app.get('/tests/:id/questions/:page', async (
	req: RequestWithParams< { id: string, page: string }>,
	res: Response<IResponseBody<{ question: IMappedQuestion, lastPage: number }>>,
) => {
	try {
		const { question, lastPage } = await getQuestion(req.params.id, +req.params.page);

		res.send({ data: { question: mapQuestion(question), lastPage }, error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This question isn\'t exist' });
		console.log(e);
	}
});

app.post('/tests', async (
	req: RequestWithBody<IAddTestRequestBody>,
	res: Response<IResponseBody<IMappedTest>>,
) => {
	try {
		const newTest = await addTest({
			title: req.body.title,
			questions: req.body.questions,
			author: req.body.user.id,
		});

		res.send({ data: mapTest(newTest), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Maybe... This test\'s title is already exists' });
		console.log(e);
	}
});

app.patch('/tests/:id', async (
	req: RequestWithParamsAndBody<{ id: string }, Pick<IMappedTest, 'title' | 'questions'>>,
	res: Response<IResponseBody<IMappedTest>>,
) => {
	try {
		const updatedTest = await editTest(req.params.id, {
			title: req.body.title,
			questions: req.body.questions,
		});

		res.send({ data: mapTest(updatedTest), error: null });
	} catch (e) {
		let error = 'Error. Failed to update test';
		if (e instanceof MongoError && e.code === 11000) {
			error = 'Тест с таким названием уже существует';
		}
		res.send({ data: null, error });
		console.log(e);
	}
});
app.delete('/tests/:id', async (
	req: Request<{ id: string }>,
	res: Response<IResponseBody<null>>,
) => {
	try {
		await deleteTest(req.params.id);
		//удаляем также истории прохождения теста
		await deleteHistory(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: 'Error. Failed to delete test' });
		console.log(e);
	}
});

app.get('/histories/:id', async (
	req: Request<{ id: string }>,
	res: Response<IResponseBody<IMappedHistory[]>>,
) => {
	try {
		const histories = await getHistories(req.params.id);

		res.send({ data: histories.map(mapHistory), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Error! Can\'t get histories' });
		console.log(e);
	}
});

app.post('/histories', async (
	req: RequestWithBody<IAddHistoryRequestBody>,
	res: Response<IResponseBody<IMappedHistory>>,
) => {
	try {
		const newHistory = await addHistory({
			user: req.body.user.id,
			test: req.body.test,
			results: req.body.results,
		});

		res.send({ data: mapHistory(newHistory), error: null });
	} catch (e) {
		res.send({ data: null, error: 'Creation of history is impossible' });
		console.log(e);
	}
});

app.delete('/histories/:id', async (
	req: Request<{ id: string }>,
	res: Response<IResponseBody<null>>,
) => {
	try {
		await deleteHistory(req.params.id);

		res.send({ error: null });
	} catch (e) {
		res.send({ error: 'Error. Failed to delete histories' });
		console.log(e);
	}
});

app.get('/*', (_, res: Response) => {
	res.sendFile(join(__dirname, '../client/build/index.html'));
});

mongoose.connect(
	//получаем строку подключения к БД из поля environment (файл docker-compose)
	process.env.DB_CONNECTION_STRING,
).then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Server has been started on port ${process.env.PORT}`);
	});
});
