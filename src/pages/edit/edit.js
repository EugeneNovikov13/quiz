import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, NavBar } from '../../components';
import { QuestionEditBlock } from './components';
import { useLayoutEffect } from 'react';
import { loadQuestionsAsync } from '../../redux/actions';
import styled from 'styled-components';
import { selectQuestions } from '../../redux/selectors/select-questions';

const EditContainer = ({ className }) => {
	const dispatch = useDispatch();
	const questions = useSelector(selectQuestions);

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync());
	}, [dispatch]);

	return (
		<div className={className}>
			<div className="test-edit-block">
				{questions.map(({ id, question, answers }) => (
					<QuestionEditBlock key={id} question={question} answers={answers} />
				))}
			</div>
			<NavBar bgColorbrightness={false} readyToComplete={true}>
				<Link to="/">
					<Button onClick={() => console.log('Назад')}>Назад</Button>
				</Link>
				<Link to="/edit">
					<Button
						className="right-button"
						onClick={() => console.log('Сохранить')}
					>
						Сохранить
					</Button>
				</Link>
			</NavBar>
		</div>
	);
};

export const Edit = styled(EditContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: calc(100vh - 140px);

	& .test-edit-block {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
		padding: 0 30px;
	}
`;
