import { ACTION_TYPE } from '../actions';

const initialTestState = {
	editedQuestions: new Set(),
	history: [],
	test: {
		id: '',
		title: '',
		createdAt: '',
		author: { name: '', surname: '' },
		questions: [],
	},
};

export const testReducer = (state = initialTestState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TEST_DATA:
			return {
				...state,
				test: action.payload,
				editedQuestions: new Set(),
			};

		case ACTION_TYPE.UPDATE_TEST_TITLE:
			return {
				...state,
				test: {
					...state.test,
					title: action.payload.title,
				},
				editedQuestions: state.editedQuestions.add(action.payload.title),
			};

		case ACTION_TYPE.SET_HISTORY:
			return {
				...state,
				history: action.payload,
			};

		case ACTION_TYPE.ADD_QUESTION:
			return {
				...state,
				test: {
					...state.test,
					questions: [...state.test.questions, action.payload],
				},
				editedQuestions: state.editedQuestions.add(action.payload.id),
			};

		case ACTION_TYPE.UPDATE_QUESTION_TEXT:
			return {
				...state,
				test: {
					...state.test,
					questions: state.test.questions.map(question =>
						question.id === action.payload.id
							? { ...question, text: action.payload.text }
							: question,
					),
				},
				editedQuestions: state.editedQuestions.add(action.payload.id),
			};

		case ACTION_TYPE.DELETE_QUESTION:
			return {
				...state,
				test: {
					...state.test,
					questions: state.test.questions.filter(
						question => question.id !== action.payload.id,
					),
				},
				editedQuestions:
					action.payload.id.slice(0, 3) === 'new'
						? new Set(
								[...state.editedQuestions].filter(
									value => value !== action.payload.id,
								),
						  )
						: state.editedQuestions.add(action.payload.id),
			};

		case ACTION_TYPE.ADD_ANSWER:
			return {
				...state,
				test: {
					...state.test,
					questions: state.test.questions.map(question =>
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
				},
				editedQuestions: state.editedQuestions.add(action.payload.questionId),
			};

		case ACTION_TYPE.CHANGE_CORRECT_ANSWER:
			return {
				...state,
				test: {
					...state.test,
					questions: state.test.questions.map(question =>
						question.id === action.payload.id
							? { ...question, correctAnswer: action.payload.text }
							: question,
					),
				},
				editedQuestions: state.editedQuestions.add(action.payload.id),
			};

		case ACTION_TYPE.UPDATE_ANSWER_TEXT:
			return {
				...state,
				test: {
					...state.test,
					questions: state.test.questions.map(question =>
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
				},
				editedQuestions: state.editedQuestions.add(action.payload.questionId),
			};

		case ACTION_TYPE.DELETE_ANSWER:
			return {
				...state,
				test: {
					...state.test,
					questions: state.test.questions.map(question =>
						question.id === action.payload.questionId
							? {
									...question,
									answers: question.answers.filter(
										answer => answer.id !== action.payload.answerId,
									),
							  }
							: question,
					),
				},
				editedQuestions: state.editedQuestions.add(action.payload.questionId),
			};

		default:
			return state;
	}
};
