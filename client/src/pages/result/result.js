import { useSelector } from 'react-redux';
import { countNumberCorrectAnswers } from '../../utils';
import { selectTestData, selectTestHistory } from '../../redux/selectors';
import { Button, Error, NavBar, PrivateContent } from '../../components';
import { ERROR } from '../../constants';
import styled from 'styled-components';

const ResultContainer = ({ className }) => {
	const history = useSelector(selectTestHistory)[0];
	const testId = useSelector(selectTestData).id;

	//считаем правльные ответы, если история существует в сторе, т.е. только что было прохождение теста
	const rightAnswersCount =
		!!history && countNumberCorrectAnswers(history.results, '/');

	return (
		<PrivateContent>
			<div className={className}>
				{history ? (
					<div className="header">
						<h1>Правильных ответов:</h1>
						<h1 className="right-answers-count">{rightAnswersCount}</h1>
					</div>
				) : (
					<Error error={ERROR.NO_RESULTS} />
				)}
				<NavBar>
					<Button link="/">На главную</Button>
					{testId && (
						<Button link={`/test/${testId}/question/1`}>
							Пройти ещё раз
						</Button>
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
