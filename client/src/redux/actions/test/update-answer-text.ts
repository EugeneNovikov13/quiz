import { IAnswer, IQuestion, TestAction, TestActionTypes } from '../../../types';

export const updateAnswerText = (
	questionId: IQuestion['id'],
	answerId: IAnswer['id'],
	text: string,
): TestAction => ({
	type: TestActionTypes.UPDATE_ANSWER_TEXT,
	payload: { questionId, answerId, text },
});
