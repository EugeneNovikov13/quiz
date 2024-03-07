import { Dispatch } from 'redux';
import { IHistory, IResult, ITest, TestAction, TestActionTypes } from '../../../types';
import { request } from '../../../utils';

export const addHistoryAsync =
	(testId: ITest['id'], results: Omit<IResult, 'id'>[]) =>
	async (dispatch: Dispatch<TestAction>) => {
		const response = await request<IHistory>('/histories', 'POST', {
			test: testId,
			results,
		});
		if (response.data) {
			dispatch({
				type: TestActionTypes.SET_HISTORY,
				payload: [response.data],
			});
		}

		return response;
	};
