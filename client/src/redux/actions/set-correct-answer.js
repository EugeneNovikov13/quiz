import { ACTION_TYPE } from './action-type';

export const setCorrectAnswer = (id, text) => ({
	type: ACTION_TYPE.SET_CORRECT_ANSWER,
	payload: { id, text },
});
