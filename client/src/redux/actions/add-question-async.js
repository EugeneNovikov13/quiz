import { ACTION_TYPE } from './action-type';
import { request } from '../../utils';

export const addQuestionAsync = () => dispatch => {
	request('/questions', 'POST', {
		text: 'Неотредактированный вопрос',
		correctAnswer: '1',
		answers: ['Неотредактированный ответ'],
	}).then(({ data }) => {
		dispatch({
			type: ACTION_TYPE.ADD_QUESTION,
			payload: data,
		});
	});
};
