import { Error } from '../error/error';
import { useSelector } from 'react-redux';
import { ERROR } from '../../constants';
import { selectAppWasLogin } from '../../redux/selectors';

export const PrivateContent = ({ children, serverError = null }) => {
	const wasLogin = useSelector(selectAppWasLogin);

	const accessError = wasLogin ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
