import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../../../redux/actions/app';
import { Button, Icon } from '../../../../components';
import { AnswerEdit } from './components';
import { EditInput } from '../edit-input/edit-input';
import icons from '../../assets';
import styled from 'styled-components';
import {
	addAnswer,
	deleteQuestion,
	updateQuestionText,
} from '../../../../redux/actions/test';
import { IAnswer, IQuestion } from '../../../../types';
import { AppThunkDispatch } from '../../../../redux/store';

interface QuestionEditProps {
	className?: string;
	id: IQuestion['id'];
	questionText: string;
	answers: IAnswer[];
}

const QuestionEditContainer: FC<QuestionEditProps> = ({
	className,
	id: questionId,
	questionText,
	answers,
}) => {
	//состояние развёрнут/свёрнут блок
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [newQuestionText, setNewQuestionText] = useState<string>(questionText || '');

	const dispatch: AppThunkDispatch = useDispatch();

	//Разворачивает блок вопроса
	const onArrowClick = () => {
		setIsExpanded(!isExpanded);
	};

	const onChange = (text: string) => {
		setNewQuestionText(text);
	};

	//Сохраняет изменение текста вопроса в стор
	const onBlur = () => {
		if (newQuestionText === questionText) {
			return;
		}
		dispatch(updateQuestionText(questionId, newQuestionText));
	};

	//Создаёт в сторе новый ответ
	const onAddAnswer = (id: IQuestion['id']) => {
		dispatch(addAnswer(id));
	};

	//Вызывает модальное окно для подтверждения удаления блока вопроса из стора
	const onQuestionDelete = (id: IQuestion['id']) => {
		dispatch(
			openModal({
				text: 'Удалить вопрос?',
				onConfirm: () => {
					dispatch(deleteQuestion(id));
					dispatch(CLOSE_MODAL());
				},
				onCancel: () => dispatch(CLOSE_MODAL()),
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
