import { request } from '../../utils';
import { addQuestion } from './add-question';

export const addQuestionAsync = () => dispatch =>
	request('/questions', 'POST', {
		text: 'Неотредактированный вопрос',
		correctAnswer: 'label',
		answers: ['Неотредактированный ответ'],
	}).then(({ data }) => {
		dispatch(addQuestion(data));
	});
