import React, { ChangeEventHandler, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectLastQuestionNumber } from '../../../../redux/selectors';
import { useTypedSelector } from '../../../../redux/store';
import { AnswerOption } from './components';
import { IAnswer } from '../../../../types';
import styled from 'styled-components';

interface TaskProps {
	className?: string;
	text: string;
	answers: IAnswer[];
	userAnswers: React.MutableRefObject<string[]>;
	setReadyToContinue: React.Dispatch<React.SetStateAction<boolean>>;
	setReadyToComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskContainer: FC<TaskProps> = ({
	className,
	text,
	answers,
	userAnswers,
	setReadyToContinue,
	setReadyToComplete,
}) => {
	const params = useParams();
	const currentPage = Number(params.pageId);
	const lastPage = useTypedSelector(selectLastQuestionNumber);
	const [selectedValue, setSelectedValue] = useState<string>('');

	//управляет переключением выбранных значений из радио-инпутов (вариантов ответа на вопрос)
	const handleRadioChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		//заносим значение в состояние и общую ссылку всех ответов на вопросы
		setSelectedValue(target.value);
		userAnswers.current[currentPage - 1] = target.value;

		//проверка на последнюю страницу и наличие ответов на ВСЕ вопросы теста
		const isLastPage = currentPage === Number(lastPage);
		const isAllAnswersTaken =
			isLastPage &&
			userAnswers.current.filter(answer => answer).length === lastPage;

		if (isAllAnswersTaken) {
			setReadyToComplete(true);
			return;
		}

		setReadyToContinue(true);
	};

	return (
		<div className={className}>
			<div className="task-number">{`${currentPage}/${lastPage}`}</div>
			<div className="question">{text}</div>
			<div className="answer-options">
				{answers.map(({ id, text }) => (
					<AnswerOption
						key={id}
						id={id}
						text={text}
						checked={text === selectedValue}
						handleRadioChange={handleRadioChange}
					/>
				))}
			</div>
		</div>
	);
};

export const Task = styled(TaskContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 400px;
	margin-bottom: 20px;

	& .question {
		margin: 10px 0 20px;
		width: 400px;
		text-align: center;
	}

	& .answer-options {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;
