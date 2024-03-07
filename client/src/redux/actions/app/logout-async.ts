import { request } from '../../../utils';
import { LOGOUT } from './logout';
import { Dispatch } from 'redux';
import { AppAction } from '../../../types/app-reducer-types';

export const logoutAsync = () => (dispatch: Dispatch<AppAction>) =>
	request<null>('/logout', 'POST').then(res => {
		if (!res.error) {
			dispatch(LOGOUT());
			sessionStorage.removeItem('userData');
		}

		return res;
	});
