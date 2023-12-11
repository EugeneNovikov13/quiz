import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';
import { AuthFormError, Button, Input } from '../../components';
import { setUser } from '../../redux/actions';
import { selectAppWasLogin } from '../../redux/selectors';
import { authorizationFormSchema } from '../../settings';
import styled from 'styled-components';

const AuthorizationContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authorizationFormSchema),
	});

	const dispatch = useDispatch();

	const wasLogin = useSelector(selectAppWasLogin);

	useResetForm(reset, wasLogin);

	const onSubmit = ({ email, password }) => {
		request('/login', 'POST', { email, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	if (wasLogin) {
		return <Navigate to="/" />;
	}

	const formError = errors?.email?.message || errors?.password?.message;

	return (
		<div className={className}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="email"
					label="Электронная почта"
					error={errors?.email?.message}
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					label="Пароль"
					error={errors?.password?.message}
					{...register('password', {
						onChange: () => setServerError(null),
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
					Войти
				</Button>
			</form>
			<p className="has-account">
				Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
			</p>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 360px;
	height: 440px;
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
