import { useDispatch, useSelector } from 'react-redux';
import { FC, useRef } from 'react';
import { findQuestionById } from '../../../../../../utils';
import { selectQuestions } from '../../../../../../redux/selectors';
import { Icon } from '../../../../../../components';
import icons from '../../../../assets';
import {
	changeCorrectAnswer,
	deleteAnswer,
	updateAnswerText,
} from '../../../../../../redux/actions/test';
import styled from 'styled-components';
import { IAnswer, IQuestion } from '../../../../../../types';
import { AppThunkDispatch } from '../../../../../../redux/store';

interface AnswerEditProps {
	className?: string;
	answerId: IAnswer['id'];
	answerText: string;
	questionId: IQuestion['id'];
}

const AnswerEditContainer: FC<AnswerEditProps> = ({
	className,
	answerId,
	answerText,
	questionId,
}) => {
	//Ссылка для хранения текста ответа
	const answerTextRef = useRef<HTMLDivElement | null>(null);
	const dispatch: AppThunkDispatch = useDispatch();
	const questions = useSelector(selectQuestions);
	const correctAnswer = findQuestionById(questionId, questions)?.correctAnswer;

	//Сохраняет изменённый текст ответа в стор
	const onBlur = () => {
		if (!answerTextRef.current) return;

		const newAnswerText = answerTextRef.current?.innerText;

		if (newAnswerText === answerText) {
			return;
		}
		dispatch(updateAnswerText(questionId, answerId, newAnswerText));
	};

	//Изменяет правильный ответ в сторе
	const onChangeCorrectAnswer = (id: IQuestion['id'], newCorrectText: string) => {
		if (newCorrectText === correctAnswer) {
			return;
		}
		dispatch(changeCorrectAnswer(id, newCorrectText));
	};

	//Удаляет ответ из стора
	const onDeleteAnswer = (
		questionIdToDelete: IQuestion['id'],
		answerIdToDelete: IAnswer['id'],
	) => {
		dispatch(deleteAnswer(questionIdToDelete, answerIdToDelete));
	};

	return (
		<div className={className}>
			{/*блок с изменяемым контентом*/}
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
	gap: 15px;

	& .answer-text {
		width: 300px;
		min-height: 42px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px 10px;
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
