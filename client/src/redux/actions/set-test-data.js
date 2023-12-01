import { ACTION_TYPE } from './action-type';

export const setTestData = testData => ({
	type: ACTION_TYPE.SET_TEST_DATA,
	payload: testData,
});
