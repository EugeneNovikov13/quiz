import { request, ResponseType } from '../../../utils';
import { setTestData } from './index';
import { Test, TestAction, TestActionTypes } from '../../../types';
import { Action, Dispatch } from 'redux';
import { ACTION_TYPE } from '../action-type';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';

type FetchDataThunkAction<T> = ThunkAction<
	Promise<ResponseType<T>>,
	RootState,
	unknown,
	Action<string>
>;

export const loadTestAsync =
	(id: Test['id']): FetchDataThunkAction<Test> =>
	(dispatch: Dispatch<TestAction>) =>
		request<Test>(`/tests/${id}`).then(res => {
			if (res.data) {
				dispatch({
					type: TestActionTypes.SET_TEST_DATA,
					payload: res.data,
				});
			}

			return res;
		});
