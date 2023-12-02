import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectQuestions } from '../../../../redux/selectors';
import { AnswerOption } from './components';

const TaskContainer = ({ className }) => {
	const questions = useSelector(selectQuestions);

	return (
		<div className={className}>
			<div className="task-number">{`9/${questions.length}`}</div>
			<div className="question">{questions[8].text}</div>
			<div className="answer-options">
				{questions[8].answers.map(({ id, text }) => (
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
		text-align: justify;
	}

	& .answer-options {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;
