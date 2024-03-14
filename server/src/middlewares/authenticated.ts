import jwtFunctions from '../helpers/token';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types';
import { HydratedDocument } from 'mongoose';

export default async function(req: Request, res: Response, next: NextFunction) {
	try {
		const token: string | null = req.cookies.token;

		if (!token) {
			console.log('Token not found');
			next();
			return;
		}

		const tokenData = jwtFunctions.verify(token);

		if (typeof tokenData === 'string') {
			console.log('В токене отсутствует id');
			return;
		}

		const user: HydratedDocument<IUser> | null = await User.findOne({ _id: tokenData.id });

		if (!user) {
			return;
		}

		req.body.user = user;

		next();
	} catch (e) {
		res.status(401).send('Ошибка аутентификации');
		next('route');
	}
};
