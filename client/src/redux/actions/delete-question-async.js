import { request } from '../../utils';
import { deleteQuestion } from './delete-question';

export const deleteQuestionAsync = id => dispatch =>
	request(`/questions/${id}`, 'DELETE').then(res => {
		if (!res.error) {
			dispatch(deleteQuestion(id));
		}
		return res;
	});
