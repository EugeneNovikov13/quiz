import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuestionsAsync } from '../../redux/actions';
import { selectLastQuestionNumber, selectQuestion } from '../../redux/selectors';
import { Button } from '../../components';
import { Task } from './components';
import styled from 'styled-components';

const QuestionContainer = ({ className }) => {
	const [readyToContinue, setReadyToContinue] = useState(false);
	const dispatch = useDispatch();
	const params = useParams();
	const currentPage = Number(params.id);
	const lastPage = useSelector(selectLastQuestionNumber);
	const { text, correctAnswer, answers } = useSelector(selectQuestion);

	useEffect(() => {
		dispatch(loadQuestionsAsync(1, currentPage));
	}, [currentPage, dispatch]);

	return (
		<div className={className}>
			<Task text={text} correctAnswer={correctAnswer} answers={answers} />
			<div className="navigate-buttons">
				<Link to={`${currentPage === 1 ? '/' : `/question/${currentPage - 1}`}`}>
					<Button activeColor={'#fddb5d'} isDisable={false}>
						{currentPage === 1 ? 'Вернуться на главную' : 'Предыдущий вопрос'}
					</Button>
				</Link>
				<Link
					to={`${
						currentPage === lastPage
							? '/result'
							: `/question/${currentPage + 1}`
					}`}
				>
					<Button activeColor={'#fddb5d'} isDisable={!readyToContinue}>
						Следующий вопрос
					</Button>
				</Link>
			</div>
		</div>
	);
};

export const Question = styled(QuestionContainer)`
	padding-top: 20px;

	& .navigate-buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 20px 0;
	}

	& button {
		color: #000;
	}

	& button:hover {
		box-shadow: 0 4px 2 px - 1 px rgba(188, 188, 188, 1);
	}

	& button.right-button {
		background-color: ${({ readyToComplete }) =>
			readyToComplete ? 'lightgreen' : ''};
	}

	& button.right-button:hover {
		filter: ${({ readyToComplete }) => (readyToComplete ? 'brightness(0.9)' : '')};
	}
`;
