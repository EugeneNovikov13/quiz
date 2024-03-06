import { request } from '../../../utils';
import { TestActionTypes } from '../../../types';

export const loadHistoryAsync = id => dispatch =>
	request(`/histories/${id}`).then(res => {
		if (res.data) {
			dispatch({
				type: TestActionTypes.SET_HISTORY,
				payload: res.data,
			});
		}

		return res;
	});
