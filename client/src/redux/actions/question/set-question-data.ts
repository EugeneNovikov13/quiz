import {
	IQuestionState,
	QuestionAction,
	QuestionActionTypes,
} from '../../../types/question-reducer-types';

export const setQuestionData = (data: IQuestionState): QuestionAction => ({
	type: QuestionActionTypes.SET_QUESTION_DATA,
	payload: {
		question: data.question,
		lastPage: data.lastPage,
	},
});
