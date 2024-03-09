import * as yup from 'yup';
import { IAuthorizationForm } from '../types/form-types';

export const authorizationFormSchema: yup.ObjectSchema<IAuthorizationForm> = yup
	.object()
	.shape({
		email: yup.string().required('Заполните адрес электронной почты'),
		password: yup.string().required('Заполните пароль'),
	});
