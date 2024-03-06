import { TestAction, TestActionTypes } from '../../../types';

export const addAnswer = (id: string): TestAction => ({
	type: TestActionTypes.ADD_ANSWER,
	payload: {
		questionId: id,
		tempAnswerId: Date.now().toString(),
	},
});
