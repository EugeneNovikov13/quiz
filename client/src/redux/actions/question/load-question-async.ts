import { request } from '../../../utils';
import { setQuestionData } from './index';
import { ITest } from '../../../types';
import { Dispatch } from 'redux';
import { IQuestionState, QuestionAction } from '../../../types/question-reducer-types';

export const loadQuestionAsync =
	(id: ITest['id'], page: number) => (dispatch: Dispatch<QuestionAction>) =>
		request<IQuestionState>(`/tests/${id}/questions/${page}`).then(res => {
			if (res.data) {
				dispatch(setQuestionData(res.data));
			}

			return res;
		});
