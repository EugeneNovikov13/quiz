import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuestionsAsync } from '../../redux/actions';
import { selectQuestions } from '../../redux/selectors';
import { Button, NavBar } from '../../components';
import { History } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadQuestionsAsync()).then(() => {
			setIsLoading(true);
		});
	}, [dispatch]);

	const questions = useSelector(selectQuestions);

	return (
		<div className={className}>
			{isLoading && (
				<>
					<NavBar isMonochrome={true}>
						<Link to={`/question/${questions[0].id}`}>
							<Button>Запустить тест</Button>
						</Link>
						<Link to="/edit">
							<Button>Редактировать тест</Button>
						</Link>
					</NavBar>
					<History />
				</>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)``;
