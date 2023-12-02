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
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_QUESTION_DATA:
			return {
				...state,
				question: {
					id: payload.question.id,
					text: payload.question.text,
					correctAnswer: payload.question.correctAnswer,
					answers: payload.question.answers,
				},
				lastQuestionNumber: payload.lastQuestionNumber,
			};

		default:
			return state;
	}
};
