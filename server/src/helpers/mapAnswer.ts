import { HydratedDocument } from 'mongoose';
import { IAnswer } from '../types';

export default function (answer: HydratedDocument<IAnswer>): IAnswer {
	return {
		id: answer.id as string,
		text: answer.text,
	}
}
