import { useLayoutEffect, useRef, useState } from 'react';
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
	const { text, answers } = useSelector(selectQuestion);
	const userAnswers = useRef([]);

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync(1, currentPage));
	}, [currentPage, dispatch]);

	const isLastPage = currentPage === lastPage;
	const isAllAnswersTaken =
		userAnswers.current.filter(answer => answer).length === lastPage;
	let readyToComplete = false;

	if (isLastPage && isAllAnswersTaken) {
		readyToComplete = true;
	}

	const onNextButtonClick = selectedAnswers => {
		console.log('Ваши выбранные ответы: ', ...selectedAnswers);
	};

	return (
		<div className={className}>
			<Task
				text={text}
				answers={answers}
				userAnswers={userAnswers}
				setReadyToContinue={setReadyToContinue}
			/>
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
					<Button
						activeColor={isLastPage ? 'lightgreen' : '#fddb5d'}
						isDisable={isLastPage ? !readyToComplete : !readyToContinue}
						onClick={() => onNextButtonClick(userAnswers.current)}
					>
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
