import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	addAnswer,
	CLOSE_MODAL,
	deleteQuestion,
	openModal,
	updateQuestionText,
} from '../../../../redux/actions';
import { Button, Icon } from '../../../../components';
import { AnswerEdit } from './components';
import icons from '../../assets';
import styled from 'styled-components';
import { EditInput } from '../edit-input/edit-input';

const QuestionEditContainer = ({ className, id: questionId, questionText, answers }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [newQuestionText, setNewQuestionText] = useState(questionText || '');

	const dispatch = useDispatch();

	const onArrowClick = () => {
		setIsExpanded(!isExpanded);
	};

	const onChange = text => {
		setNewQuestionText(text);
	};

	const onBlur = () => {
		if (newQuestionText === questionText) {
			return;
		}
		dispatch(updateQuestionText(questionId, newQuestionText));
	};

	const onAddAnswer = id => {
		dispatch(addAnswer(id));
	};

	const onQuestionDelete = id => {
		dispatch(
			openModal({
				text: 'Удалить вопрос?',
				onConfirm: () => {
					dispatch(deleteQuestion(id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			{isExpanded ? (
				<>
					<div className="ques-header">
						<EditInput
							value={newQuestionText}
							placeholder="Введите вопрос и хотя бы 2 ответа"
							onChange={({ target }) => onChange(target.value)}
							onBlur={() => onBlur()}
						/>
						<div className="control-panel">
							<Icon
								iconSrc={icons.trashBin}
								width={'15px'}
								onClick={() => onQuestionDelete(questionId)}
							/>
							<Icon
								iconSrc={icons.upArrow}
								width={'20px'}
								onClick={onArrowClick}
							/>
						</div>
					</div>
					<Button
						width="400px"
						maxWidth="300px"
						height="40px"
						onClick={() => onAddAnswer(questionId)}
					>
						+
					</Button>
					<div className="answers">
						{answers.map(({ id: answerId, text: answerText }) => (
							<AnswerEdit
								key={answerId}
								answerId={answerId}
								answerText={answerText}
								questionId={questionId}
							/>
						))}
					</div>
				</>
			) : (
				<div className="ques-header" onClick={onArrowClick}>
					<div className="ques-title">{questionText}</div>
					<Icon iconSrc={icons.downArrow} width={'25px'} />
				</div>
			)}
		</div>
	);
};

export const QuestionEditBlock = styled(QuestionEditContainer)`
	display: flex;
	flex-direction: column;
	gap: 15px;
	border: 1px solid #ccc;
	border-radius: 10px;
	padding: 5px 15px;

	& .control-panel {
		height: 20px;
		display: flex;
		gap: 10px;
	}

	& .ques-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
	}

	& .ques-title {
		font-size: 18px;
	}

	& .answers {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	@media (max-width: 550px) {
		& .control-panel {
			flex-direction: column-reverse;
			justify-content: center;
			align-items: center;
		}
	}
`;
