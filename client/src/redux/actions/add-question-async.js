import { request } from '../../utils';
import { addQuestion } from './add-question';

export const addQuestionAsync = () => dispatch =>
	request('/questions', 'POST', {
		text: 'Введите вопрос...',
		correctAnswer: 'noCorrectAnswer',
		answers: ['Введите ответ...'],
	}).then(({ data }) => {
		dispatch(addQuestion(data));
	});
