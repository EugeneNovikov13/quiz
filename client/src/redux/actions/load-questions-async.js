import { request } from '../../utils';
import { setTestData } from './set-test-data';

export const loadQuestionsAsync = () => dispatch => {
	request('/questions').then(res => {
		if (res.data) {
			dispatch(setTestData(res.data.questions));
		}

		return res;
	});
};
