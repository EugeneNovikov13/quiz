import { useSelector } from 'react-redux';
import { selectAppWasLogin } from '../../redux/selectors';
import { Error } from '../error/error';
import { ERROR } from '../../constants';

//компонент защищает от нахождения пользователей на страницах, куда им закрыт доступ
export const PrivateContent = ({ children, serverError = null }) => {
	const wasLogin = useSelector(selectAppWasLogin);

	const accessError = wasLogin ? null : ERROR.SHOULD_LOGIN;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
