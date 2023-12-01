import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addQuestionAsync, loadQuestionsAsync } from '../../redux/actions';
import { selectEditedQuestions, selectQuestions } from '../../redux/selectors';
import { Button, NavBar } from '../../components';
import { QuestionEditBlock } from './components';
import styled from 'styled-components';
import { updateQuestionsAsync } from '../../redux/actions/update-questions-async';
import { checkErrors, filterDataByIdSet } from '../../utils';

const EditContainer = ({ className }) => {
	const [isNewQuestionCreated, setIsNewQuestionCreated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const questions = useSelector(selectQuestions);
	const editedQuestions = useSelector(selectEditedQuestions);

	const readyToSave = !checkErrors(questions) && !!editedQuestions.size;

	useEffect(() => {
		dispatch(loadQuestionsAsync()).then(() => {
			setIsLoading(true);
		});
	}, [dispatch]);

	const onAddQuestion = () => {
		dispatch(addQuestionAsync());
		setIsNewQuestionCreated(true);
	};

	const onSave = async (allQuestions, requiredIds) => {
		const questionsToSave = filterDataByIdSet(allQuestions, requiredIds);
		await dispatch(updateQuestionsAsync(questionsToSave));
		setIsNewQuestionCreated(false);
	};

	return (
		<div className={className}>
			{isLoading && (
				<div className="test-edit-block">
					{questions.map(({ id, text, correctAnswer, answers }) => (
						<QuestionEditBlock
							key={id}
							id={id}
							questionText={text}
							correctAnswer={correctAnswer}
							answers={answers}
							isNewQuestionCreated={isNewQuestionCreated}
							setIsNewQuestionCreated={setIsNewQuestionCreated}
						/>
					))}
					{!isNewQuestionCreated && (
						<div className="add-question-button" onClick={onAddQuestion}>
							Добавить вопрос
						</div>
					)}
				</div>
			)}
			<NavBar isActive={true} readyToComplete={readyToSave}>
				<Link to="/">
					<Button>Назад</Button>
				</Link>
				{readyToSave && (
					<Link to="/edit">
						<Button
							className="right-button"
							onClick={() => onSave(questions, editedQuestions)}
						>
							Сохранить
						</Button>
					</Link>
				)}
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

	& .add-question-button {
		height: 34px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px 15px;
		text-align: center;
	}

	& .add-question-button:hover {
		background-color: #000;
		color: #fff;
		cursor: pointer;
	}
`;
