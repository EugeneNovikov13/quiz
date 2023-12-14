import { request } from '../../utils';
import { RESET_TEST_DATA } from './reset-test-data';

export const addTestAsync = test => dispatch =>
	request('/tests', 'POST', {
		title: test.title,
		questions: test.questions,
	}).then(res => {
		if (res.data) {
			dispatch(RESET_TEST_DATA);
		}

		return res;
	});
