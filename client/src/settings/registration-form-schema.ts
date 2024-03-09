import * as yup from 'yup';
import { IRegistrationForm } from '../types/form-types';

export const registrationFormSchema: yup.ObjectSchema<IRegistrationForm> = yup
	.object()
	.shape({
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
		password: yup
			.string()
			.required('Заполните пароль')
			.matches(
				/^[\w@$^&#%!"№;:?*()_'`~.,|<>=]+$/,
				'Допускаются только латинские буквы, цифры и символы',
			)
			.min(6, 'Неверный пароль. Минимум 6 символа')
			.max(30, 'Неверный пароль. Максимум 30 символов'),
		passCheck: yup
			.string()
			.required('Заполните пароль')
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
		image: yup.string().url('Должен быть правильный URL'),
	});
