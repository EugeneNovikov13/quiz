import { request } from './index';
import { IUser } from '../types';

export const updateUserAsync = ({ name, surname, email, image }: IUser) =>
	request<IUser>('/users', 'PATCH', { name, surname, email, image }).then(res => {
		if (!res.error) {
			sessionStorage.setItem('userData', JSON.stringify(res.data));
		}

		return res;
	});
