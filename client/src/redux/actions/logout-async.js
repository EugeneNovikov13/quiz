import { request } from '../../utils';
import { LOGOUT } from './logout';

export const logoutAsync = () => dispatch =>
	request('/logout', 'POST').then(res => {
		if (!res.error) {
			dispatch(LOGOUT);
			sessionStorage.removeItem('userData');
		}

		return res;
	});
