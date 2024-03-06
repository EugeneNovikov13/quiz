import { IAnswer, IQuestion, TestAction, TestActionTypes } from '../../../types';

export const deleteAnswer = (
	questionId: IQuestion['id'],
	answerId: IAnswer['id'],
): TestAction => ({
	type: TestActionTypes.DELETE_ANSWER,
	payload: { questionId, answerId },
});
