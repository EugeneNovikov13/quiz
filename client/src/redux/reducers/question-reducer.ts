import {
	IQuestionState,
	QuestionAction,
	QuestionActionTypes,
} from '../../types/question-reducer-types';

const initialQuestionState: IQuestionState = {
	question: {
		id: '',
		text: '',
		correctAnswer: '',
		answers: [],
	},
	lastPage: 1,
};

export const questionReducer = (
	state = initialQuestionState,
	action: QuestionAction,
): IQuestionState => {
	switch (action.type) {
		case QuestionActionTypes.SET_QUESTION_DATA:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
