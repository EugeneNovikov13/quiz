import { request } from '../../utils';
import { setHistoryData } from './set-history-data';

export const loadHistoryAsync = id => dispatch =>
	request(`/histories/${id}`).then(res => {
		if (res.data) {
			dispatch(setHistoryData(res.data));
		}

		return res;
	});
