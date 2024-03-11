import tokenOperation from '../helpers/token';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IUserDocument } from '../types';

////???????????????????????????
declare global {
	namespace Express {
		interface Request {
			user?: IUserDocument; // Добавляем поле user типа IUserDocument
		}
	}
}

export default async function(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;

	if (!token) {
		console.log('Token not found');
		next();
		return;
	}

	const tokenData = tokenOperation.verify(req.cookies.token);

	const user = await User.findOne({ _id: tokenData.id });

	type UserFromDB = ReturnType<typeof user>

	if (!user) {
		return;
	}

	req.user = user;

	next();
};
