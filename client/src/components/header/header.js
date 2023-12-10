import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../icon/icon';
import { Tooltip } from '../tooltip/tooltip';
import { TOOLTIP_POSITION } from '../../constants';
import user from './assets/user.svg';
import styled from 'styled-components';
import { UserMenu } from './components';

const HeaderContainer = ({ className }) => {
	const [isHovered, setIsHovered] = useState(false);

	const onMouseEnter = () => {
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
			<Icon width={'50px'} iconSrc={user} onMouseEnter={() => onMouseEnter()} />
			<Tooltip
				isHovered={isHovered}
				tooltipPosition={TOOLTIP_POSITION.USER_MENU}
				isInvisible={true}
			>
				<UserMenu onMouseLeave={onMouseLeave} />
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
`;
