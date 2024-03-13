import mapQuestion from './mapQuestion';
import { HydratedDocument } from 'mongoose';
import { IMappedTest, ITest } from '../types';

export  default function (test: HydratedDocument<ITest>): IMappedTest {
	const dateObject = new Date(test.createdAt);

	return {
		id: test.id as string,
		title: test.title,
		createdAt: dateObject.toLocaleDateString(),
		author: {
			name: test.author?.name || 'user',
			surname: test.author?.surname || 'Unknown',
		},
		questions: test.questions.map(mapQuestion),
	}
}
