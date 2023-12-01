import { ACTION_TYPE } from './action-type';

export const changeCorrectAnswer = (id, text) => ({
	type: ACTION_TYPE.CHANGE_CORRECT_ANSWER,
	payload: { id, text },
});
