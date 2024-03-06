import { ACTION_TYPE } from '../action-type';

export const updateAnswerText = (questionId, answerId, text) => ({
	type: ACTION_TYPE.UPDATE_ANSWER_TEXT,
	payload: { questionId, answerId, text },
});
