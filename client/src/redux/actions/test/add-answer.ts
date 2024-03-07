import { IQuestion, TestAction, TestActionTypes } from '../../../types';

export const addAnswer = (id: IQuestion['id']): TestAction => ({
	type: TestActionTypes.ADD_ANSWER,
	payload: {
		questionId: id,
		tempAnswerId: Date.now().toString(),
	},
});
