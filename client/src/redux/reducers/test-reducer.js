import { ACTION_TYPE } from '../actions';

const initialTestState = {
	questions: [],
	isEdited: false,
};

export const testReducer = (state = initialTestState, action) => {
	switch (action.type) {
		case ACTION_TYPE.RESET_IS_EDITED:
			return {
				...state,
				isEdited: false,
			};

		case ACTION_TYPE.SET_TEST_DATA:
			return {
				...state,
				questions: action.payload,
			};

		case ACTION_TYPE.SET_CORRECT_ANSWER:
			return {
				...state,
				questions: state.questions.map(question =>
					question.id === action.payload.id
						? { ...question, correctAnswer: action.payload.text }
						: question,
				),
				isEdited: true,
			};

		case ACTION_TYPE.DELETE_ANSWER:
			return {
				...state,
				questions: state.questions.map(question =>
					question.id === action.payload.questionId
						? {
								...question,
								answers: question.answers.filter(
									answer => answer.id !== action.payload.answerId,
								),
						  }
						: question,
				),
				isEdited: true,
			};

		default:
			return state;
	}
};
