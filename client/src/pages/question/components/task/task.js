import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectLastQuestionNumber } from '../../../../redux/selectors';
import { AnswerOption } from './components';
import { useParams } from 'react-router-dom';

const TaskContainer = ({ className, text, correctAnswer, answers }) => {
	const params = useParams();
	const currentPage = Number(params.id);
	const lastPage = useSelector(selectLastQuestionNumber);

	return (
		<div className={className}>
			<div className="task-number">{`${currentPage}/${lastPage}`}</div>
			<div className="question">{text}</div>
			<div className="answer-options">
				{answers.map(({ id, text }) => (
					<AnswerOption key={id} id={id} text={text} />
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
