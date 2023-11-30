import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import icons from '../../../../assets';
import { Icon } from '../../../../../../components';
import { selectQuestions } from '../../../../../../redux/selectors/select-questions';
import { findQuestionById } from '../../../../../../utils';
import { deleteAnswer, setCorrectAnswer } from '../../../../../../redux/actions';
import styled from 'styled-components';

const AnswerEditContainer = ({ className, answerId, answerText, questionId }) => {
	const answerTextRef = useRef(null);
	const dispatch = useDispatch();
	const questions = useSelector(selectQuestions);
	const correctAnswer = findQuestionById(questionId, questions).correctAnswer;

	const onChangeCorrectAnswer = (id, newCorrectText) => {
		dispatch(setCorrectAnswer(id, newCorrectText));
	};

	const onDeleteAnswer = (questionIdToDelete, answerIdToDelete) => {
		dispatch(deleteAnswer(questionIdToDelete, answerIdToDelete));
	};

	return (
		<div className={className}>
			<div
				ref={answerTextRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="answer-text"
			>
				{answerText}
			</div>
			<div className="answer-icons">
				<div
					className="checked"
					onClick={() => onChangeCorrectAnswer(questionId, answerText)}
				>
					<Icon
						iconSrc={answerText === correctAnswer ? icons.checkedMark : ''}
						width={'15px'}
					/>
				</div>
				<Icon
					iconSrc={icons.trashBin}
					width={'15px'}
					onClick={() => onDeleteAnswer(questionId, answerId)}
				/>
			</div>
		</div>
	);
};

export const AnswerEdit = styled(AnswerEditContainer)`
	display: flex;
	gap: 5px;

	& .answer-text {
		width: 300px;
		min-height: 42px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px;
	}

	& .answer-text:focus {
		background-color: #fff;
	}

	& .answer-icons {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	& .checked {
		width: 15px;
		height: 15px;
		border: 1px solid #000;
		border-radius: 50%;
	}

	& .checked:hover {
		cursor: pointer;
	}
`;
