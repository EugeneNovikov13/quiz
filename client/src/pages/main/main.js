import { Link } from 'react-router-dom';
import { Button, NavBar } from '../../components';
import { History } from './components';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';

const MainContainer = ({ className }) => {
	useLayoutEffect(() => {
		async function fetchData() {
			const url = '';

			const data = await fetch(url);

			console.log('Получены данные', data);
		}

		fetchData();
	}, []);

	return (
		<div className={className}>
			<NavBar brightness={false}>
				<Link to="/question">
					<Button onClick={() => console.log('Запуск теста')}>
						Запустить тест
					</Button>
				</Link>
				<Link to="/edit">
					<Button onClick={() => console.log('Редактирование теста')}>
						Редактировать тест
					</Button>
				</Link>
			</NavBar>
			<History />
		</div>
	);
};

export const Main = styled(MainContainer)``;
