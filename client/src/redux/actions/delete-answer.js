import { ACTION_TYPE } from './action-type';

export const deleteAnswer = (questionId, answerId) => ({
	type: ACTION_TYPE.DELETE_ANSWER,
	payload: { questionId, answerId },
});
