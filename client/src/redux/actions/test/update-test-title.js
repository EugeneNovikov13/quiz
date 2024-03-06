import { ACTION_TYPE } from '../action-type';

export const updateTestTitle = title => ({
	type: ACTION_TYPE.UPDATE_TEST_TITLE,
	payload: { title },
});
