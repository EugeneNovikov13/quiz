import { ACTION_TYPE } from './action-type';

export const addQuestion = data => ({
	type: ACTION_TYPE.ADD_QUESTION,
	payload: data,
});
