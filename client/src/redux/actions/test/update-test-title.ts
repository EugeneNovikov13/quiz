import { TestAction, TestActionTypes } from '../../../types';

export const updateTestTitle = (title: string): TestAction => ({
	type: TestActionTypes.UPDATE_TEST_TITLE,
	payload: { title },
});
