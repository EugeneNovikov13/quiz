import * as yup from 'yup';

export const authorizationFormSchema = yup.object().shape({
	email: yup.string().required('Заполните адрес электронной почты'),
	password: yup.string().required('Заполните пароль'),
});
