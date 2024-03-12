import jwtFunctions from '../helpers/token';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IUserDocument } from '../types';

export default async function(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.cookies.token;

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

		const user: IUserDocument | null = await User.findOne({ _id: tokenData.id });

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
