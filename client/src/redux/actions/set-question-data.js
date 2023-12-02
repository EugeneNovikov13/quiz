import { ACTION_TYPE } from './action-type';

export const setQuestionData = data => ({
	type: ACTION_TYPE.SET_QUESTION_DATA,
	payload: {
		question: data.questions[0],
		lastQuestionNumber: data.lastQuestionNumber,
	},
});
