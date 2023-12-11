import { request } from '../../utils';
import { setTestData } from './set-test-data';

export const loadTestAsync = id => dispatch =>
	request(`/tests/${id}`).then(res => {
		if (res.data) {
			dispatch(setTestData(res.data));
		}

		return res;
	});
