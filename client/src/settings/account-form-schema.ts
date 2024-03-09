import * as yup from 'yup';
import { IAccountForm } from '../types/form-types';

export const accountFormSchema: yup.ObjectSchema<IAccountForm> = yup.object().shape({
	name: yup
		.string()
		.required('Заполните имя')
		.matches(/^[A-Za-zА-Яа-я ]+$/, 'Допускаются только буквы и пробел')
		.max(30, 'Максимум 30 символов'),
	surname: yup
		.string()
		.required('Заполните фамилию')
		.matches(/^[A-Za-zА-Яа-я-]+$/, 'Допускаются только буквы и тире')
		.max(30, 'Максимум 30 символов'),
	email: yup
		.string()
		.required('Заполните адрес электронной почты')
		.email('Должен быть правильный адрес электронной почты'),
	image: yup.string().url('Должен быть правильный URL'),
});
