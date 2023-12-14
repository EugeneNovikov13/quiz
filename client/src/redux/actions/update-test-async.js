import { request } from '../../utils';
import { setTestData } from './set-test-data';

export const updateTestAsync = test => dispatch =>
	request(`/tests/${test.id}`, 'PATCH', {
		title: test.title,
		questions: test.questions,
	}).then(res => {
		if (res.data) {
			dispatch(setTestData(res.data));
		}

		return res;
	});
