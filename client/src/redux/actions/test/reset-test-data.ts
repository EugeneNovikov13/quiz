import { TestAction, TestActionTypes } from '../../../types';

export const RESET_TEST_DATA = (): TestAction => ({
	type: TestActionTypes.RESET_TEST_DATA,
});
