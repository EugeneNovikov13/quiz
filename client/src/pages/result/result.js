import styled from 'styled-components';
import { Button, NavBar } from '../../components';
import { Link } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../utils';
import { countNumberCorrectAnswers } from '../../utils/count-number-correct-answers';

const ResultContainer = ({ className }) => {
	const history = getItemFromLocalStorage('history');

	console.log(history);

	const lastTestResult = history[history.length - 1];

	const rightAnswersCount = countNumberCorrectAnswers(lastTestResult);

	return (
		<div className={className}>
			<div className="header">
				<h1>Правильных ответов:</h1>
				<h1 className="right-answers-count">{rightAnswersCount}</h1>
			</div>
			<NavBar>
				<Link to="/">
					<Button>На главную</Button>
				</Link>
				<Link to="/question/1">
					<Button>Пройти ещё раз</Button>
				</Link>
			</NavBar>
		</div>
	);
};

export const Result = styled(ResultContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& .header {
		margin: 100px 0;
	}

	& h1 {
		font-size: 45px;
		font-weight: normal;
		line-height: 52px;
		margin: 0;
	}

	& .right-answers-count {
		color: lightgreen;
		filter: brightness(0.9);
	}
`;
