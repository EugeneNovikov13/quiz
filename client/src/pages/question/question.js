import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuestionsAsync } from '../../redux/actions';
import { selectLastQuestionNumber, selectQuestion } from '../../redux/selectors';
import {
	checkTestResult,
	generateDataForHistory,
	updateItemInLocalStorage,
} from '../../utils';
import { Button } from '../../components';
import { Task } from './components';
import { QUESTIONS_AMOUNT_TO_LOAD } from '../../constants';
import styled from 'styled-components';

const QuestionContainer = ({ className }) => {
	//есть выбранный ответ, готов переходить на следующий вопрос
	const [readyToContinue, setReadyToContinue] = useState(false);
	const dispatch = useDispatch();

	//получаем текущий номер страницы вопроса, чтобы при переключении страницы  менялась зависимость в useLayoutEffect
	const params = useParams();
	const currentPage = Number(params.id);

	//последнюю страницу, вопросы и ответы получаем из редюсера, куда эти данные приходят после запроса в useLayoutEffect
	const lastPage = useSelector(selectLastQuestionNumber);
	const { text, answers } = useSelector(selectQuestion);

	//ответы на текущий тест храним здесь
	const userAnswers = useRef([]);

	const navigate = useNavigate();

	//загрузка вопроса и ответов
	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync(QUESTIONS_AMOUNT_TO_LOAD.ONE_QUESTION, currentPage));
	}, [currentPage, dispatch]);

	//проверка на последнюю страницу и наличие ответов на ВСЕ вопросы теста
	const isLastPage = currentPage === lastPage;
	const isAllAnswersTaken =
		userAnswers.current.filter(answer => answer).length === lastPage;
	const readyToComplete = isLastPage && isAllAnswersTaken;

	//обработка нажатия кнопки "Следующий" для записи результатов теста и переключения на страницу "Результат"
	const onNextButtonClick = async selectedAnswers => {
		if (!readyToComplete) return;

		let testData;

		await dispatch(loadQuestionsAsync()).then(({ data }) => {
			testData = data.questions;
		});

		const testResult = checkTestResult(testData, selectedAnswers);
		const dataForHistory = generateDataForHistory(testResult);
		updateItemInLocalStorage('history', dataForHistory);

		navigate('/result');
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
						currentPage === lastPage ? '' : `/question/${currentPage + 1}`
					}`}
				>
					<Button
						activeColor={isLastPage ? 'lightgreen' : '#fddb5d'}
						isDisable={isLastPage ? !readyToComplete : !readyToContinue}
						onClick={() => onNextButtonClick(userAnswers.current)}
					>
						{isLastPage ? 'Завершить тест' : 'Следующий вопрос'}
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
