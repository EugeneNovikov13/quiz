import { request } from '../../../utils';
import { ITest, TestAction, TestActionTypes } from '../../../types';
import { Dispatch } from 'redux';

export const loadTestAsync =
	(id: ITest['id']) => async (dispatch: Dispatch<TestAction>) => {
		const response = await request<ITest>(`/tests/${id}`);
		if (response.data) {
			dispatch({
				type: TestActionTypes.SET_TEST_DATA,
				payload: response.data,
			});
		}
		return response;
	};
