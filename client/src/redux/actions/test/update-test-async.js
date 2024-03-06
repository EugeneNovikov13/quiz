import { request } from '../../../utils';
import { TestActionTypes } from '../../../types';

export const updateTestAsync = test => dispatch =>
	request(`/tests/${test.id}`, 'PATCH', {
		title: test.title,
		questions: test.questions,
	}).then(res => {
		if (res.data) {
			dispatch({
				type: TestActionTypes.SET_TEST_DATA,
				payload: res.data,
			});
		}

		return res;
	});
