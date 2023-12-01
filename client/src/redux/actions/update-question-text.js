import { ACTION_TYPE } from './action-type';

export const updateQuestionText = (id, text) => ({
	type: ACTION_TYPE.UPDATE_QUESTION_TEXT,
	payload: { id, text },
});
