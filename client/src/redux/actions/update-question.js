import { ACTION_TYPE } from './action-type';

export const updateQuestion = data => ({
	type: ACTION_TYPE.UPDATE_QUESTION,
	payload: data,
});
