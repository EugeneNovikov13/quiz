import { request } from '../../utils';
import { setTestData } from './set-test-data';
import { setQuestionData } from './set-question-data';

export const loadQuestionsAsync =
	(limit = 0, page = 1) =>
	dispatch => {
		if (limit === 0) {
			return request(`/questions?limit=${limit}&page=${page}`).then(res => {
				if (res.data) {
					dispatch(setTestData(res.data.questions));
				}

				return res;
			});
		}

		return request(`/questions?limit=${limit}&page=${page}`).then(res => {
			if (res.data) {
				dispatch(setQuestionData(res.data));
			}

			return res;
		});
	};
