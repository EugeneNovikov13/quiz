import { Link } from 'react-router-dom';
import { countNumberCorrectAnswers, getItemFromLocalStorage } from '../../utils';
import { Button, NavBar, PrivateContent } from '../../components';
import styled from 'styled-components';

const ResultContainer = ({ className }) => {
	const history = getItemFromLocalStorage('history');

	const lastTestResult = history[history.length - 1];

	const rightAnswersCount = countNumberCorrectAnswers(lastTestResult.testResult, '/');

	return (
		<PrivateContent>
			<div className={className}>
				{history && (
					<div className="header">
						<h1>Правильных ответов:</h1>
						<h1 className="right-answers-count">{rightAnswersCount}</h1>
					</div>
				)}
				<NavBar>
					<Link to="/">
						<Button>На главную</Button>
					</Link>
					{history && (
						<Link to="/question/1">
							<Button>Пройти ещё раз</Button>
						</Link>
					)}
				</NavBar>
			</div>
		</PrivateContent>
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
		text-align: center;
	}
`;
