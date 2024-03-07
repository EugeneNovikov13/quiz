import { request } from '../../../utils';
import { IHistory, TestAction, TestActionTypes } from '../../../types';
import { Dispatch } from 'redux';

export const loadHistoryAsync =
	(id: IHistory['id']) => async (dispatch: Dispatch<TestAction>) =>
		request<IHistory[]>(`/histories/${id}`).then(res => {
			if (res.data) {
				dispatch({
					type: TestActionTypes.SET_HISTORY,
					payload: res.data,
				});
			}

			return res;
		});
