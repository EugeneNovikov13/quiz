import { ACTION_TYPE } from './action-type';

export const deleteQuestion = id => ({
	type: ACTION_TYPE.DELETE_QUESTION,
	payload: { id },
});
