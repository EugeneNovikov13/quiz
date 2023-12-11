import { ACTION_TYPE } from '../actions';

const initialQuestionState = {
	question: {
		id: '',
		text: '',
		correctAnswer: '',
		answers: [],
	},
	lastQuestionNumber: 1,
};

export const questionReducer = (state = initialQuestionState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_QUESTION_DATA:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
