import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	addQuestionAsync,
	loadTestAsync,
	updateQuestionsAsync,
	updateTestTitle,
} from '../../redux/actions';
import { selectEditedQuestions } from '../../redux/selectors';
import { checkErrors, filterDataByIdSet } from '../../utils';
import { Button, NavBar, PrivateContent } from '../../components';
import { EditInput, QuestionEditBlock } from './components';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { selectTestData } from '../../redux/selectors/select-test-data';

const EditContainer = ({ className }) => {
	const [isNewQuestionCreated, setIsNewQuestionCreated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const dispatch = useDispatch();
	const params = useParams();
	const { title, questions } = useSelector(selectTestData);
	const editedQuestions = useSelector(selectEditedQuestions);

	const readyToSave = !checkErrors(questions) && !!editedQuestions.size;

	useEffect(() => {
		dispatch(loadTestAsync(params.id)).then(res => {
			if (res.error) {
				setErrorMessage(res.error);
				return;
			}
			setNewTitle(res.data.title);
			setIsLoading(true);
		});
	}, [dispatch, params.id]);

	const onBlur = () => {
		if (newTitle === title) {
			return;
		}
		dispatch(updateTestTitle(newTitle));
	};

	const onAddQuestion = () => {
		dispatch(addQuestionAsync());
		setIsNewQuestionCreated(true);
	};

	const onSave = async (allQuestions, requiredIds) => {
		const questionsToSave = filterDataByIdSet(allQuestions, requiredIds);
		if (questionsToSave.length) await dispatch(updateQuestionsAsync(questionsToSave));
		setIsNewQuestionCreated(false);
	};

	return (
		<PrivateContent serverError={errorMessage}>
			<div className={className}>
				{isLoading && (
					<div className="test-edit-block">
						<EditInput
							value={newTitle}
							onChange={({ target }) => setNewTitle(target.value)}
							onBlur={() => onBlur()}
						/>
						{questions.map(({ id, text, answers }) => (
							<QuestionEditBlock
								key={id}
								id={id}
								questionText={text}
								answers={answers}
								isNewQuestionCreated={isNewQuestionCreated}
								setIsNewQuestionCreated={setIsNewQuestionCreated}
							/>
						))}
						<Button
							activeColor="#000"
							width="100%"
							height="50px"
							fontSize="18px"
							isDisable={isNewQuestionCreated}
							onClick={onAddQuestion}
						>
							Добавить вопрос
						</Button>
					</div>
				)}
				<NavBar readyToComplete={readyToSave}>
					<Button link="/user-tests">Назад</Button>
					{readyToSave && isLoading && (
						<Button
							className="right-button"
							link="/user-tests"
							onClick={() => onSave(questions, editedQuestions)}
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
