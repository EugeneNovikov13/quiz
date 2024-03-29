import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserAsync } from '../../utils';
import { AuthFormError, Icon, Input, PrivateContent } from '../../components';
import { icons } from './assets';
import { accountFormSchema, userDefaultValues } from '../../settings';
import styled from 'styled-components';
import { IAccountForm } from '../../types/form-types';
import { IUser } from '../../types';

interface AccountProps {
	className?: string;
}

const AccountContainer: FC<AccountProps> = ({ className }) => {
	const [serverError, setServerError] = useState<string>('');
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const userData = sessionStorage.getItem('userData');
	const user: Omit<IUser, 'id'> & Partial<{ id: string }> = userData
		? JSON.parse(userData)
		: userDefaultValues;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<IAccountForm>({
		defaultValues: user,
		resolver: yupResolver(accountFormSchema),
	});

	const onCancel = () => {
		reset(user);
		setIsUpdating(false);
	};

	//обновляем данные о пользователе через запрос на сервер, в случае успеха обновляем данные в sessionStorage
	const onSubmit: SubmitHandler<IAccountForm> = formData => {
		updateUserAsync(formData).then(res => {
			if (res.error) {
				setServerError(`Ошибка запроса: ${res.error}`);
				return;
			}
			setIsUpdating(false);
		});
	};

	return (
		<PrivateContent serverError={serverError}>
			<div className={className}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{isUpdating ? (
						<>
							<div className="cancel">
								<Icon
									iconSrc={icons.cancel}
									width="34px"
									onClick={() => onCancel()}
								></Icon>
							</div>
							<button type="submit">
								<Icon
									iconSrc={
										isDirty ? icons.checkMarkActive : icons.checkMark
									}
									isDisable={!isDirty}
									width="40px"
								></Icon>
							</button>
						</>
					) : (
						<div className="edit">
							<Icon
								iconSrc={icons.editPencil}
								width="40px"
								onClick={() => setIsUpdating(true)}
							></Icon>
						</div>
					)}
					<img className="avatar" src={user.image} alt={'N/A'} />
					{isUpdating ? (
						<>
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
								type="url"
								label="URL аватарки (необязательно)"
								error={errors?.image?.message}
								{...register('image', {
									onChange: () => setServerError(''),
								})}
							/>
							<AuthFormError>{serverError}</AuthFormError>
						</>
					) : (
						<>
							<p>{user.surname + ' ' + user.name}</p>
							<p>{user.email}</p>
						</>
					)}
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
	height: max-content;
	max-height: 700px;
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

	& button:disabled {
		cursor: default;
	}

	& p {
		margin: 3px;
		font-size: 18px;
		font-weight: 500;
	}

	& .cancel {
		position: absolute;
		left: 0;
		padding: 3px;
	}

	& .edit {
		position: absolute;
		right: 0;
	}

	& .avatar {
		width: 300px;
		height: 300px;
		margin: 0 auto 10px;
	}
`;
