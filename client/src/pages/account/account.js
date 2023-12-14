import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from '../../utils';
import { setUser } from '../../redux/actions';
import { AuthFormError, Icon, Input, PrivateContent } from '../../components';
import * as icons from './assets';
import { accountFormSchema } from '../../settings';
import styled from 'styled-components';

const AccountContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);

	const user = JSON.parse(sessionStorage.getItem('userData'));

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: user.name,
			surname: user.surname,
			email: user.email,
			image: user.image,
		},
		resolver: yupResolver(accountFormSchema),
	});

	const dispatch = useDispatch();

	const onSubmit = ({ name, surname, email, image }) => {
		request('/register', 'POST', { name, surname, email, image }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			},
		);
	};

	const formError =
		errors?.name?.message ||
		errors?.surname?.message ||
		errors?.email?.message ||
		errors?.image?.message;

	return (
		<PrivateContent serverError={serverError}>
			<div className={className}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<button type="submit" disabled={!!formError}>
						<Icon
							iconSrc={
								!!formError ? icons.checkMark : icons.checkMarkActive
							}
							width="40px"
						></Icon>
					</button>
					<img className="avatar" src={user.image} alt="" />
					<Input
						type="text"
						label="Имя"
						error={errors?.name?.message}
						{...register('name', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="text"
						label="Фамилия"
						error={errors?.surname?.message}
						{...register('surname', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="email"
						label="Электронная почта"
						error={errors?.email?.message}
						{...register('email', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="url"
						label="URL аватарки (необязательно)"
						error={errors?.image?.message}
						{...register('image', {
							onChange: () => setServerError(null),
						})}
					/>
					<AuthFormError>{serverError}</AuthFormError>
				</form>
			</div>
		</PrivateContent>
	);
};

export const Account = styled(AccountContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 360px;
	height: 700px;
	border: 1px solid #eee;
	border-radius: 20px;
	box-shadow: 0 2px 2px 2px rgba(204, 204, 204, 1);
	padding: 10px 20px 30px;

	& form {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		min-width: 360px;
	}

	& button {
		position: absolute;
		right: 0;
		width: 40px;
		height: 40px;
		background-color: transparent;
		border: none;
		padding: 0;
	}

	& .avatar {
		width: 300px;
		height: 300px;
		margin: 0 auto 10px;
	}
`;
