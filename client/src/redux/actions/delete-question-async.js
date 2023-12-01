import { request } from '../../utils';
import { deleteQuestion } from './delete-question';

export const deleteQuestionAsync = id => dispatch =>
	request(`/questions/${id}`, 'DELETE').then(() => {
		dispatch(deleteQuestion(id));
	});
