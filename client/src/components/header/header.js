import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/icon';
import { Tooltip } from '../tooltip/tooltip';
import user from './assets/user.svg';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	const [isHovered, setIsHovered] = useState(false);
	const tooltipPosition = { x: 80, y: 65 };

	const onMouseEnter = event => {
		setIsHovered(true);
	};

	const onMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<header className={className}>
			<div className="nav-menu">
				<Link to="/">Главная</Link>
				<Link to="/user-tests">Мои тесты</Link>
			</div>
			<Icon
				width={'50px'}
				iconSrc={user}
				onMouseEnter={e => onMouseEnter(e)}
				onMouseLeave={() => onMouseLeave()}
			/>
			<Tooltip isHovered={isHovered} tooltipPosition={tooltipPosition}>
				<div className="user-menu">
					<Link to="/account">
						<span>Профиль</span>
					</Link>
					<span>Выход</span>
				</div>
			</Tooltip>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	max-width: 1000px;
	min-width: 400px;
	height: 70px;
	background-color: #eee;
	padding: 10px 30px;

	& .nav-menu {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	& .nav-menu a {
		font-size: 20px;
		font-weight: 500;
		transition: 0.3s;
	}

	& .nav-menu a:hover {
		transform: scale(1.05);
	}

	& .user-menu {
		display: flex;
		flex-direction: column;
	}
`;
