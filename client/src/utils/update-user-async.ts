import { request } from './index';
import { IUser } from '../types';

export const updateUserAsync = ({ name, surname, email, image }: Omit<IUser, 'id'>) =>
	request<IUser>('/users', 'PATCH', { name, surname, email, image }).then(res => {
		if (!res.error && res.data) {
			sessionStorage.setItem('userData', JSON.stringify(res.data));
		}

		return res;
	});
