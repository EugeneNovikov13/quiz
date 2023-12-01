import { ACTION_TYPE } from './action-type';

export const addAnswer = id => ({
	type: ACTION_TYPE.ADD_ANSWER,
	payload: {
		questionId: id,
		tempAnswerId: Date.now().toString(),
	},
});
