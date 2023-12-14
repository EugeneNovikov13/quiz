import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logoutAsync } from '../../../../redux/actions';
import { errorDemonstration } from '../../../../utils';

const UserMenuContainer = ({ className, onMouseLeave }) => {
	const dispatch = useDispatch();

	//логаут изменяет в сторе состояние wasLogin, а также удаляет из sessionStorage данные пользователя
	const onLogout = () => {
		onMouseLeave();
		dispatch(logoutAsync()).then(res => {
			if (res.error) {
				errorDemonstration(dispatch, res.error);
			}
		});
	};

	return (
		<div className={className} onMouseLeave={onMouseLeave}>
			<div className="menu">
				<Link to="/account">
					<span onClick={() => onMouseLeave()}>Профиль</span>
				</Link>
				<Link to="/">
					<span onClick={() => onLogout()}>Выход</span>
				</Link>
			</div>
		</div>
	);
};

export const UserMenu = styled(UserMenuContainer)`
	display: flex;
	width: 120px;
	height: 150px;
	justify-content: flex-end;
	flex-direction: column;

	& .menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		width: 120px;
		height: 70px;
		border: 1px solid #eee;
		border-radius: 8px;
		box-shadow: -1px 3px 3px 0 rgba(170, 170, 170, 0.5);
		background-color: #fff;
	}

	& span {
		font-size: 20px;
		text-decoration: underline;
		transition: 0.3s;
	}

	& span:hover {
		text-decoration: none;
	}
`;
