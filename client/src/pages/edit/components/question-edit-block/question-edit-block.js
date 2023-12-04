import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addAnswer,
	CLOSE_MODAL,
	deleteQuestionAsync,
	openModal,
	updateQuestionText,
} from '../../../../redux/actions';
import { Icon } from '../../../../components';
import { AnswerEdit } from './components';
import icons from '../../assets';
import styled from 'styled-components';
import { selectNewQuestionId } from '../../../../redux/selectors';

const QuestionEditContainer = ({
	className,
	id: questionId,
	questionText,
	answers,
	isNewQuestionCreated,
	setIsNewQuestionCreated,
}) => {
	const [isExpanded, setIsExpanded] = useState(isNewQuestionCreated);
	const [newQuestionText, setNewQuestionText] = useState(questionText || '');
	const newQuestionId = useSelector(selectNewQuestionId);

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

	const errorDemonstration = error => {
		dispatch(
			openModal({
				text: error,
				onConfirm: () => dispatch(CLOSE_MODAL),
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const onQuestionDelete = (id, checkingId) => {
		dispatch(
			openModal({
				text: 'Удалить вопрос?',
				onConfirm: () => {
					dispatch(deleteQuestionAsync(id)).then(res => {
						if (res.error) errorDemonstration(res.error);
					});
					dispatch(CLOSE_MODAL);
					if (checkingId === id) {
						setIsNewQuestionCreated(false);
					}
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
						<input
							type="text"
							value={newQuestionText}
							onChange={({ target }) => onChange(target.value)}
							onBlur={() => onBlur()}
						/>
						<div className="control-panel">
							<Icon
								iconSrc={icons.trashBin}
								width={'15px'}
								onClick={() =>
									onQuestionDelete(questionId, newQuestionId)
								}
							/>
							<Icon
								iconSrc={icons.upArrow}
								width={'20px'}
								onClick={onArrowClick}
							/>
						</div>
					</div>
					<div
						className="add-answer-button"
						onClick={() => onAddAnswer(questionId)}
					>
						+
					</div>
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
					<Icon iconSrc={icons.downArrow} width={'20px'} />
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

	& input {
		width: 300px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px 10px;
		font-size: 15px;
		background-color: inherit;
		transition: width 0.5s ease-in;
	}

	& input:focus {
		width: 600px;
		background-color: #fff;
		outline: 1px solid #000;
	}

	& .ques-header {
		display: flex;
		justify-content: space-between;
	}

	& .add-answer-button {
		width: 300px;
		height: 30px;
		line-height: 26px;
		border: 1px solid #ccc;
		border-radius: 10px;
		text-align: center;
	}

	& .add-answer-button:hover {
		background-color: #000;
		color: #fff;
		cursor: pointer;
	}

	& .answers {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;
