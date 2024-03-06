import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { generateTestResult } from '../../utils';
import { loadQuestionAsync } from '../../redux/actions/question';
import { addHistoryAsync, loadTestAsync } from '../../redux/actions/test';
import { selectLastQuestionNumber, selectQuestion } from '../../redux/selectors';
import { AppThunkDispatch, useTypedSelector } from '../../redux/store';
import { IQuestion } from '../../types';
import { Button, PrivateContent } from '../../components';
import { Task } from './components';
import styled from 'styled-components';

interface QuestionProps {
	className?: string;
}

const QuestionContainer: FC<QuestionProps> = ({ className }) => {
	//ответы на текущий тест храним здесь
	const userAnswers = useRef<string[]>([]);

	const [errorMessage, setErrorMessage] = useState<string>('');

	//есть выбранный ответ, готов переходить на следующий вопрос
	const [readyToContinue, setReadyToContinue] = useState<boolean>(false);
	//все ответы на вопросы теста получены, готов подводить итоги
	const [readyToComplete, setReadyToComplete] = useState<boolean>(false);

	//получаем текущий номер страницы вопроса, чтобы при переключении страницы  менялась зависимость в useLayoutEffect
	const params = useParams();
	const currentPage = Number(params.pageId);

	//вопросы получаем из редюсера, куда эти данные приходят после запроса в useLayoutEffect
	const question = useTypedSelector(selectQuestion);
	const lastPage = useTypedSelector(selectLastQuestionNumber);

	const dispatch: AppThunkDispatch = useDispatch();
	const navigate = useNavigate();
	const isLastPage = currentPage === Number(lastPage);

	//ставит в ответ ноль при переключении на страницу, чтобы не сохранялись прежние ответы
	useEffect(() => {
		userAnswers.current[currentPage - 1] = '';
	}, [currentPage]);

	//загрузка вопроса и ответов
	useLayoutEffect(() => {
		if (!params.id) return;

		try {
			dispatch(loadQuestionAsync(params.id, currentPage)).then(res => {
				if (res.error) setErrorMessage(res.error);
			});
		} catch (e) {
			console.log(e);
		}
	}, [dispatch, currentPage, params]);

	//Запись результатов теста и переключение на страницу "Результат"
	const onNextButtonClick = async (selectedAnswers: string[]) => {
		if (!readyToComplete) return;

		let testData: IQuestion[] = [];

		try {
			if (!params.id) return;

			//получаем тест целиком
			await dispatch(loadTestAsync(params.id)).then(res => {
				if (res.error) {
					setErrorMessage(res.error);
				}
				if (res.data) {
					testData = res.data.questions;
				}
			});

			//генерируем результат теста в подходящую форму
			const testResult = generateTestResult(testData, selectedAnswers);

			//отправляем результат в БД
			await dispatch(addHistoryAsync(params.id, testResult)).then(res => {
				if (res.error) setErrorMessage(res.error);
			});

			navigate('/result');
		} catch (e) {
			console.log(e);
		}
	};

	const onBackButtonClick = () => {
		setReadyToContinue(false);
		setReadyToComplete(false);
	};

	//ссылки для навигационных кнопок
	const linkForBackButton = `${
		currentPage === 1
			? `/test/${params?.id}`
			: `/test/${params?.id}/question/${currentPage - 1}`
	}`;

	const linkForNextButton = `${
		currentPage === lastPage ? '' : `/test/${params?.id}/question/${currentPage + 1}`
	}`;

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
					<Button
						link={linkForBackButton}
						activeColor={'#fddb5d'}
						isDisable={false}
						height="65px"
						onClick={onBackButtonClick}
					>
						{currentPage === 1
							? 'Назад на страницу теста'
							: 'Предыдущий вопрос'}
					</Button>
					<Button
						link={linkForNextButton}
						activeColor={isLastPage ? 'lightgreen' : '#fddb5d'}
						isDisable={isLastPage ? !readyToComplete : !readyToContinue}
						height="65px"
						onClick={() => onNextButtonClick(userAnswers.current)}
					>
						{isLastPage ? 'Завершить тест' : 'Следующий вопрос'}
					</Button>
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
