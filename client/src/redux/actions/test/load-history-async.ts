import { request } from '../../../utils';
import { History, TestAction, TestActionTypes } from '../../../types';
import { Dispatch } from 'redux';

export const loadHistoryAsync =
	(id: History['id']) => async (dispatch: Dispatch<TestAction>) =>
		request<History[]>(`/histories/${id}`).then(res => {
			if (res.data) {
				dispatch({
					type: TestActionTypes.SET_HISTORY,
					payload: res.data,
				});
			}

			return res;
		});
