import { IQuestion, TestAction, TestActionTypes } from '../../../types';

export const updateQuestionText = (id: IQuestion['id'], text: string): TestAction => ({
	type: TestActionTypes.UPDATE_QUESTION_TEXT,
	payload: { id, text },
});
