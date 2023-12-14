import { ACTION_TYPE } from './action-type';

export const addQuestion = () => ({
	type: ACTION_TYPE.ADD_QUESTION,
	payload: {
		id: 'new' + Date.now().toString(),
		text: '',
		correctAnswer: 'noCorrectAnswer',
		answers: [
			{
				id: Date.now().toString() + '1',
				text: '',
			},
			{
				id: Date.now().toString() + '2',
				text: '',
			},
		],
	},
});
