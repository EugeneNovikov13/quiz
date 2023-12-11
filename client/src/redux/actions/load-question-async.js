import { request } from '../../utils';
import { setQuestionData } from './set-question-data';

export const loadQuestionAsync = (id, page) => dispatch =>
	request(`/tests/${id}/questions/${page}`).then(res => {
		if (res.data) {
			dispatch(setQuestionData(res.data));
		}

		return res;
	});

