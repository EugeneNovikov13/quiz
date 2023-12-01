import { request } from '../../utils';
import { updateQuestion } from './update-question';

export const updateQuestionsAsync = questions => dispatch => {
	Promise.all(
		questions.map(question =>
			request(`/questions/${question.id}`, 'PATCH', {
				text: question.text,
				correctAnswer: question.correctAnswer,
				answers: question.answers.map(answer => answer.text),
			}),
		),
	).then(results => {
		results.forEach(result => {
			dispatch(updateQuestion(result.data));
		});
	});
};
