import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectLastQuestionNumber } from '../../../../redux/selectors';
import { AnswerOption } from './components';
import styled from 'styled-components';

const TaskContainer = ({
	className,
	text,
	correctAnswer,
	answers,
	setReadyToContinue,
}) => {
	const params = useParams();
	const currentPage = Number(params.id);
	const lastPage = useSelector(selectLastQuestionNumber);
	const [checkboxes, setCheckboxes] = useState({});

	useEffect(() => {
		const checkboxesInitialState = answers.reduce(
			(acc, answer) => ({ ...acc, [answer.id]: false }),
			{},
		);
		setCheckboxes(checkboxesInitialState);
	}, [answers]);

	const checkboxChange = changedId => {
		const updatedCheckboxes = { ...checkboxes };
		for (let id in updatedCheckboxes) {
			if (id !== changedId) {
				updatedCheckboxes[id] = false;
			}
		}
		updatedCheckboxes[changedId] = !updatedCheckboxes[changedId];
		setCheckboxes(updatedCheckboxes);

		if (updatedCheckboxes[changedId]) {
			setReadyToContinue(true);
			return;
		}
		setReadyToContinue(false);
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
						checked={checkboxes[id] || false}
						checkboxChange={checkboxChange}
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
