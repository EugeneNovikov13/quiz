import { request } from '../../utils';
import { setTestData } from './set-test-data';

export const addTestAsync = test => dispatch =>
	request('/tests', 'POST', {
		title: test.title,
		questions: test.questions,
	}).then(res => {
		if (res.data) {
			dispatch(setTestData(res.data));
		}

		return res;
	});
