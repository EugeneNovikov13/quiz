import { ACTION_TYPE } from './action-type';

export const updateQuestion = data => ({
	type: ACTION_TYPE.UPDATE_QUESTION_TEXT,
	payload: { question: data },
});
