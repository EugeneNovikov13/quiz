import { Button, NavBar } from '../../components';
import { Task } from './components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuestionContainer = ({ className }) => {
	const id = '';

	return (
		<div className={className}>
			<Task />
			<NavBar isMonochrome={false}>
				<Link to={`/question/${id}`}>
					<Button isDisabled={true}>Предыдущий вопрос</Button>
				</Link>
				<Link to={`/question/${id}`}>
					<Button isDisabled={true}>Следующий вопрос</Button>
				</Link>
			</NavBar>
		</div>
	);
};

export const Question = styled(QuestionContainer)`
	padding-top: 20px;
`;
