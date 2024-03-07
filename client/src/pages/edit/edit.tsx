import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { checkErrors } from '../../utils';
import { selectEditedQuestions, selectTestData } from '../../redux/selectors';
import { Button, NavBar, PrivateContent } from '../../components';
import { EditInput, QuestionEditBlock } from './components';
import {
	addQuestion,
	addTestAsync,
	loadTestAsync,
	RESET_TEST_DATA,
	updateTestAsync,
	updateTestTitle,
} from '../../redux/actions/test';
import styled from 'styled-components';
import { AppThunkDispatch } from '../../redux/store';
import { ITest } from '../../types';

interface EditProps {
	className?: string;
}

const EditContainer: FC<EditProps> = ({ className }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [newTitle, setNewTitle] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const dispatch: AppThunkDispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const test = useSelector(selectTestData);
	const { title, questions } = test;
	const editedQuestions = useSelector(selectEditedQuestions);

	const isCreating = !params.id;
	const readyToSave = !checkErrors(title, questions) && !!editedQuestions.size;

	useEffect(() => {
		//Если в адресной строке нет id теста, очищаем стор.тест перед созданием нового теста
		if (!params.id) {
			dispatch(RESET_TEST_DATA);
			setIsLoading(false);
			return;
		}

		//Запрашиваем данные теста по id
		dispatch(loadTestAsync(params.id))
			.then(res => {
				if (res.error) {
					setErrorMessage(res.error);
					return;
				}
				if (res.data) {
					setNewTitle(res.data.title);
				}
			})
			.catch(e => {
				setErrorMessage(e.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [isCreating, dispatch, params.id]);

	//Сохраняет в стор новое название теста
	const onBlur = () => {
		if (newTitle === title) {
			return;
		}
		dispatch(updateTestTitle(newTitle));
	};

	//Добавляет в стор в массив вопросов новый объект вопроса
	const onAddQuestion = () => {
		dispatch(addQuestion());
	};

	//Сохраняет новый/изменённый тест в БД, используя текущие данные теста в сторе
	const onSave = async (testData: ITest) => {
		let action;
		isCreating ? (action = addTestAsync) : (action = updateTestAsync);

		dispatch(action(testData))
			.then(res => {
				if (res.error) {
					setErrorMessage(res.error);
					return;
				}
				navigate('/user-tests');
			})
			.catch(e => {
				setErrorMessage(e.message);
			});
	};

	return (
		<PrivateContent serverError={errorMessage}>
			<div className={className}>
				{!isLoading && (
					<div className="test-edit-block">
						<EditInput
							value={newTitle}
							placeholder="Введите название теста"
							onChange={({ target }) => setNewTitle(target.value)}
							onBlur={() => onBlur()}
						/>
						{questions.map(({ id, text, answers }) => (
							<QuestionEditBlock
								key={id}
								id={id}
								questionText={text}
								answers={answers}
							/>
						))}
						<Button
							activeColor="#000"
							width="100%"
							height="50px"
							fontSize="18px"
							onClick={onAddQuestion}
						>
							Добавить вопрос
						</Button>
					</div>
				)}
				<NavBar readyToComplete={readyToSave}>
					<Button link="/user-tests" width="450px" maxWidth="360px">
						Назад
					</Button>
					{readyToSave && !isLoading && (
						<Button
							className="right-button"
							width="450px"
							maxWidth="360px"
							onClick={() => onSave(test)}
						>
							Сохранить
						</Button>
					)}
				</NavBar>
			</div>
		</PrivateContent>
	);
};

export const Edit = styled(EditContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 960px;
	min-width: 360px;
	min-height: calc(100vh - 170px);

	& .test-edit-block {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
	}
`;
