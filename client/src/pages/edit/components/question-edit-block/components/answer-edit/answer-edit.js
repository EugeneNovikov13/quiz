import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import {
	changeCorrectAnswer,
	deleteAnswer,
	updateAnswerText,
} from '../../../../../../redux/actions';
import { findQuestionById } from '../../../../../../utils';
import { selectQuestions } from '../../../../../../redux/selectors';
import { Icon } from '../../../../../../components';
import icons from '../../../../assets';
import styled from 'styled-components';

const AnswerEditContainer = ({ className, answerId, answerText, questionId }) => {
	const answerTextRef = useRef(null);
	const dispatch = useDispatch();
	const questions = useSelector(selectQuestions);
	const correctAnswer = findQuestionById(questionId, questions).correctAnswer;

	const onBlur = () => {
		const newAnswerText = answerTextRef.current.innerText;

		if (newAnswerText === answerText) {
			return;
		}
		dispatch(updateAnswerText(questionId, answerId, newAnswerText));
	};

	const onChangeCorrectAnswer = (id, newCorrectText) => {
		if (newCorrectText === correctAnswer) {
			return;
		}
		dispatch(changeCorrectAnswer(id, newCorrectText));
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
				onBlur={() => onBlur()}
			>
				{answerText}
			</div>
			<div className="answer-icons">
				<div
					className="checked"
					onClick={() => onChangeCorrectAnswer(questionId, answerText)}
				>
					<Icon
						iconSrc={
							answerText === correctAnswer && correctAnswer !== ''
								? icons.checkedMark
								: ''
						}
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
		transition: width 0.5s ease-in;
	}

	& .answer-text:focus {
		width: 600px;
		background-color: #fff;
		outline: 1px solid #000;
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
