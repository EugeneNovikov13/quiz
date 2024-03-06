import { IQuestion, TestAction, TestActionTypes } from '../../../types';

export const deleteQuestion = (id: IQuestion['id']): TestAction => ({
	type: TestActionTypes.DELETE_QUESTION,
	payload: { id },
});
