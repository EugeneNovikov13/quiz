import { FC, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';
import { SET_USER } from '../../redux/actions/app';
import { selectAppWasLogin } from '../../redux/selectors';
import { AuthFormError, Button, Input } from '../../components';
import { registrationFormSchema } from '../../settings';
import styled from 'styled-components';
import { IRegistrationForm } from '../../types/form-types';
import { IUser } from '../../types';

interface RegistrationProps {
	className?: string;
}

const RegistrationContainer: FC<RegistrationProps> = ({ className }) => {
	const [serverError, setServerError] = useState<string>('');

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegistrationForm>({
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			password: '',
			passCheck: '',
			image: '',
		},
		resolver: yupResolver(registrationFormSchema),
		mode: 'onBlur',
	});

	const dispatch = useDispatch();

	const wasLogin = useSelector(selectAppWasLogin);

	useResetForm<IRegistrationForm>(reset, wasLogin);

	const onSubmit: SubmitHandler<IRegistrationForm> = data => {
		request<IUser>('/register', 'POST', {
			name: data.name,
			surname: data.surname,
			email: data.email,
			password: data.password,
			image: data.image,
		}).then(res => {
			if (res.error) {
				setServerError(`Ошибка запроса: ${res.error}`);
				return;
			}
			if (res.data) {
				dispatch(SET_USER());
				sessionStorage.setItem('userData', JSON.stringify(res.data));
			}
		});
	};

	if (wasLogin) {
		return <Navigate to="/" />;
	}

	const formError =
		errors?.name?.message ||
		errors?.surname?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.passCheck?.message ||
		errors?.image?.message;

	return (
		<div className={className}>
			<h2>Sign up</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					label="Имя"
					error={errors?.name?.message}
					{...register('name', {
						onChange: () => setServerError(''),
					})}
				/>
				<Input
					type="text"
					label="Фамилия"
					error={errors?.surname?.message}
					{...register('surname', {
						onChange: () => setServerError(''),
					})}
				/>
				<Input
					type="email"
					label="Электронная почта"
					error={errors?.email?.message}
					{...register('email', {
						onChange: () => setServerError(''),
					})}
				/>
				<Input
					type="password"
					label="Пароль"
					error={errors?.password?.message}
					{...register('password', {
						onChange: () => setServerError(''),
					})}
				/>
				<Input
					type="password"
					label="Повторить пароль"
					error={errors?.passCheck?.message}
					{...register('passCheck', {
						onChange: () => setServerError(''),
					})}
				/>
				<Input
					type="url"
					label="URL аватарки (необязательно)"
					error={errors?.image?.message}
					{...register('image', {
						onChange: () => setServerError(''),
					})}
				/>
				<AuthFormError>{serverError}</AuthFormError>
				<Button
					type="submit"
					isDisable={!!formError}
					activeColor="#000"
					width="180px"
					height="35px"
					fontSize="16px"
				>
					Регистрация
				</Button>
			</form>
			<p className="has-account">
				Есть аккаунт? <Link to="/authorization">Войти</Link>
			</p>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 360px;
	min-height: 740px;
	border: 1px solid #eee;
	border-radius: 20px;
	box-shadow: 0 2px 2px 2px rgba(204, 204, 204, 1);
	padding: 0 20px 30px;

	& form {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 360px;
	}

	& .has-account {
		font-size: 12px;
	}

	& .has-account a {
		color: #008cff;
		text-decoration: underline;
	}
`;
