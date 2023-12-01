import { Link } from 'react-router-dom';
import { Button, NavBar } from '../../components';
import { History } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	return (
		<div className={className}>
			<NavBar isActive={true}>
				<Link to="/question">
					<Button onClick={() => console.log('Запуск теста')}>
						Запустить тест
					</Button>
				</Link>
				<Link to="/edit">
					<Button>Редактировать тест</Button>
				</Link>
			</NavBar>
			<History />
		</div>
	);
};

export const Main = styled(MainContainer)``;
