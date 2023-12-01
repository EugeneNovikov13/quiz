import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADD_QUESTION, loadQuestionsAsync } from '../../redux/actions';
import { selectEditedQuestions, selectQuestions } from '../../redux/selectors';
import { Button, NavBar } from '../../components';
import { QuestionEditBlock } from './components';
import styled from 'styled-components';
import { updateQuestions } from '../../redux/actions/update-questions';
import { filterDataByIdSet, validateQuestions } from '../../utils';

const EditContainer = ({ className }) => {
	const [isNewQuestionCreated, setIsNewQuestionCreated] = useState(false);

	const dispatch = useDispatch();
	const questions = useSelector(selectQuestions);
	const editedQuestions = useSelector(selectEditedQuestions);

	useLayoutEffect(() => {
		dispatch(loadQuestionsAsync());
	}, [dispatch]);

	const onAddQuestion = () => {
		dispatch(ADD_QUESTION);
		setIsNewQuestionCreated(true);
	};

	const onSave = (allQuestions, requiredIds) => {
		const readyToSave = validateQuestions(allQuestions);
		const questionsToSave = filterDataByIdSet(allQuestions, requiredIds);
		dispatch(updateQuestions(questionsToSave));
	};

	return (
		<div className={className}>
			<div className="test-edit-block">
				{questions.map(({ id, text, correctAnswer, answers }) => (
					<QuestionEditBlock
						key={id}
						id={id}
						questionText={text}
						correctAnswer={correctAnswer}
						answers={answers}
						isNewQuestionCreated={isNewQuestionCreated}
					/>
				))}
				<div className="add-question-button" onClick={onAddQuestion}>
					Добавить вопрос
				</div>
			</div>
			<NavBar isActive={true} readyToComplete={!!editedQuestions.size}>
				<Link to="/">
					<Button>Назад</Button>
				</Link>
				<Link to="/edit">
					<Button
						className="right-button"
						isDisabled={!editedQuestions.size}
						onClick={() => onSave(questions, editedQuestions)}
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

	& .add-question-button {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px 15px;
		text-align: center;
	}

	& .add-question-button:hover {
		background-color: #000;
		color: #fff;
	}
`;
