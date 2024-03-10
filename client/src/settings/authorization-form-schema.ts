import * as yup from 'yup';
import { FormSchema, IAuthorizationForm } from '../types/form-types';

export const authorizationFormSchema = yup
	.object()
	.shape<FormSchema<IAuthorizationForm>>({
		email: yup.string().required('Заполните адрес электронной почты'),
		password: yup.string().required('Заполните пароль'),
	});
