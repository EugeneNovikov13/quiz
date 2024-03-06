import { useSelector } from 'react-redux';
import { selectAppWasLogin } from '../../redux/selectors';
import { ErrorMessage } from '../error-message/error-message';
import { ERROR } from '../../constants';
import { ReactNode } from 'react';

interface PrivateContentProps {
	children: ReactNode;
	serverError?: string;
}

//компонент защищает от нахождения пользователей на страницах, куда им закрыт доступ
export const PrivateContent = ({ children, serverError = '' }: PrivateContentProps) => {
	const wasLogin = useSelector(selectAppWasLogin);

	const accessError = wasLogin ? null : ERROR.SHOULD_LOGIN;
	const error = serverError || accessError;

	return error ? <ErrorMessage message={error} /> : children;
};
