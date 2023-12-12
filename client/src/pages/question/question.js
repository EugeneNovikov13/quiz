import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateTestResult } from '../../utils';
import { addHistoryAsync, loadQuestionAsync, loadTestAsync } from '../../redux/actions';
import { selectLastPage, selectQuestion } from '../../redux/selectors';
import { Button, PrivateContent } from '../../components';
import { Task } from './components';
import styled from 'styled-components';

const QuestionContainer = ({ className }) => {
	//ответы на текущий тест храним здесь
	const userAnswers = useRef([]);

	const [errorMessage, setErrorMessage] = useState(null);

	//есть выбранный ответ, готов переходить на следующий вопрос
	const [readyToContinue, setReadyToContinue] = useState(false);
	const [readyToComplete, setReadyToComplete] = useState(false);
	const dispatch = useDispatch();

	//получаем текущий номер страницы вопроса, чтобы при переключении страницы  менялась зависимость в useLayoutEffect
	const params = useParams();
	const currentPage = Number(params.pageId);

	//вопросы получаем из редюсера, куда эти данные приходят после запроса в useLayoutEffect
	const question = useSelector(selectQuestion);
	const lastPage = useSelector(selectLastPage);

	const navigate = useNavigate();

	useEffect(() => {
		userAnswers.current[currentPage - 1] = null;
	}, [currentPage]);

	//загрузка вопроса и ответов
	useLayoutEffect(() => {
		dispatch(loadQuestionAsync(params.id, currentPage)).then(res => {
			if (res.error) setErrorMessage(res.error);
		});
	}, [dispatch, currentPage, params.id]);

	const isLastPage = currentPage === Number(lastPage);

	//обработка нажатия кнопки "Следующий" для записи результатов теста и переключения на страницу "Результат"
	const onNextButtonClick = async selectedAnswers => {
		if (!readyToComplete) return;

		let testData;

		await dispatch(loadTestAsync(params.id)).then(res => {
			if (res.error) setErrorMessage(res.error);
			testData = res.data.questions;
		});

		const testResult = generateTestResult(testData, selectedAnswers);

		await dispatch(addHistoryAsync(params.id, testResult)).then(res => {
			if (res.error) setErrorMessage(res.error);
		});

		navigate('/result');
	};

	const onBackButtonClick = () => {
		setReadyToContinue(false);
		setReadyToComplete(false);
	};

	return (
		<PrivateContent serverError={errorMessage}>
			<div className={className}>
				<Task
					text={question.text}
					answers={question.answers}
					userAnswers={userAnswers}
					setReadyToContinue={setReadyToContinue}
					setReadyToComplete={setReadyToComplete}
				/>
				<div className="navigate-buttons">
					<Link
						to={`${
							currentPage === 1
								? `/test/${params.id}`
								: `/test/${params.id}/question/${currentPage - 1}`
						}`}
					>
						<Button
							activeColor={'#fddb5d'}
							isDisable={false}
							height="65px"
							onClick={onBackButtonClick}
						>
							{currentPage === 1
								? 'Назад на страницу теста'
								: 'Предыдущий вопрос'}
						</Button>
					</Link>
					<Link
						to={`${
							currentPage === lastPage
								? ''
								: `/test/${params.id}/question/${currentPage + 1}`
						}`}
					>
						<Button
							activeColor={isLastPage ? 'lightgreen' : '#fddb5d'}
							isDisable={isLastPage ? !readyToComplete : !readyToContinue}
							height="65px"
							onClick={() => onNextButtonClick(userAnswers.current)}
						>
							{isLastPage ? 'Завершить тест' : 'Следующий вопрос'}
						</Button>
					</Link>
				</div>
			</div>
		</PrivateContent>
	);
};

export const Question = styled(QuestionContainer)`
	padding-top: 20px;

	& .navigate-buttons {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		align-items: center;
		width: 100%;
		padding: 20px 0;
	}

	& button {
		color: #000;
	}

	@media (max-width: 720px) {
		.navigate-buttons {
			flex-direction: column-reverse;
		}
	}
`;
