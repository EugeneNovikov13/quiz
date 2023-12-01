import { ACTION_TYPE } from '../actions';

const initialTestState = {
	questions: [],
	editedQuestions: new Set(),
};

export const testReducer = (state = initialTestState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TEST_DATA:
			return {
				...state,
				questions: action.payload,
				editedQuestions: new Set(),
			};

		case ACTION_TYPE.ADD_QUESTION:
			return {
				...state,
				questions: [
					...state.questions,
					{
						id: Date.now().toString(),
						text: '',
						correctAnswer: '',
						answers: [
							{
								id: Date.now().toString(),
								text: '',
							},
						],
					},
				],
			};

		case ACTION_TYPE.DELETE_QUESTION:
			return {
				...state,
				questions: state.questions.filter(
					question => question.id !== action.payload.id,
				),
			};

		case ACTION_TYPE.UPDATE_QUESTION_TEXT:
			return {
				...state,
				questions: state.questions.map(question =>
					question.id === action.payload.id
						? { ...question, text: action.payload.text }
						: question,
				),
				editedQuestions: state.editedQuestions.add(action.payload.id),
			};

		case ACTION_TYPE.ADD_ANSWER:
			return {
				...state,
				questions: state.questions.map(question =>
					question.id === action.payload.questionId
						? {
								...question,
								answers: [
									{
										id: action.payload.tempAnswerId,
										text: '',
									},
									...question.answers,
								],
						  }
						: question,
				),
				editedQuestions: state.editedQuestions.add(action.payload.questionId),
			};

		case ACTION_TYPE.CHANGE_CORRECT_ANSWER:
			return {
				...state,
				questions: state.questions.map(question =>
					question.id === action.payload.id
						? { ...question, correctAnswer: action.payload.text }
						: question,
				),
				editedQuestions: state.editedQuestions.add(action.payload.id),
			};

		case ACTION_TYPE.UPDATE_ANSWER_TEXT:
			return {
				...state,
				questions: state.questions.map(question =>
					question.id === action.payload.questionId
						? {
								...question,
								answers: question.answers.map(answer => {
									if (answer.id !== action.payload.answerId)
										return answer;

									return { ...answer, text: action.payload.text };
								}),
						  }
						: question,
				),
				editedQuestions: state.editedQuestions.add(action.payload.questionId),
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
				editedQuestions: state.editedQuestions.add(action.payload.questionId),
			};

		default:
			return state;
	}
};
