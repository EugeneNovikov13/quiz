import { Dispatch } from 'redux';
import { History, Result, ITest, TestAction, TestActionTypes } from '../../../types';
import { request } from '../../../utils';

export const addHistoryAsync =
	(testId: ITest['id'], results: Omit<Result, 'id'>[]) =>
	async (dispatch: Dispatch<TestAction>) => {
		const response = await request<History>('/histories', 'POST', {
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
