import { request } from '../../utils';
import { setHistoryData } from './set-history-data';

export const addHistoryAsync = (testId, results) => dispatch =>
	request('/histories', 'POST', {
		test: testId,
		results,
	}).then(res => {
		if (res.data) {
			dispatch(setHistoryData([res.data]));
		}

		return res;
	});
