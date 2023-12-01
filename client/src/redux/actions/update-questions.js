import { ACTION_TYPE } from './action-type';
import { request } from '../../utils';

export const updateQuestions = questions => dispatch => {
	Promise.all(
		questions.map(question =>
			request(`/questions/${question.id}`, 'PATCH', {
				text: question.text,
				correctAnswer: question.correctAnswer,
				answers: question.answers.map(answer => answer.text),
			}),
		),
	).then(results => {
		const questions = [];

		results.forEach(result => {
			questions.push(result.data);

			dispatch({
				type: ACTION_TYPE.UPDATE_QUESTION,
				payload: result.data,
			});
		});

		return dispatch({
			type: ACTION_TYPE.SET_TEST_DATA,
			payload: questions,
		});
	});
};
