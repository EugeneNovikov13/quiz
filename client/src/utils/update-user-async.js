import { request } from './index';

export const updateUserAsync = ({ name, surname, email, image }) =>
	request('/users', 'PATCH', { name, surname, email, image }).then(res => {
		if (!res.error) {
			sessionStorage.setItem('userData', JSON.stringify(res.data));
		}

		return res;
	});
