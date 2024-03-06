import { TestAction, TestActionTypes } from '../../../types';

export const addQuestion = (): TestAction => ({
	type: TestActionTypes.ADD_QUESTION,
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
