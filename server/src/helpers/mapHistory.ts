import mapResult from './mapResult';
import { HydratedDocument } from 'mongoose';
import { IHistory, IMappedHistory } from '../types';

export default function (history: HydratedDocument<IHistory>): IMappedHistory {
	return {
		id: history.id,
		user: {
			name: history.user?.name || 'user',
			surname: history.user?.surname || 'Unknown',
		},
		results: history.results.map(mapResult),
		testDate: history.createdAt.toLocaleDateString(),
		testTime: history.createdAt.toLocaleTimeString(),
	}
}
