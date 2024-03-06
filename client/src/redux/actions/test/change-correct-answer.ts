import { IQuestion, TestAction, TestActionTypes } from '../../../types';

export const changeCorrectAnswer = (id: IQuestion['id'], text: string): TestAction => ({
	type: TestActionTypes.CHANGE_CORRECT_ANSWER,
	payload: { id, text },
});
