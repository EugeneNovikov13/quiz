import { TestResult } from './components';
import styled from 'styled-components';

const HistoryContainer = ({ className, history }) => {
	return (
		<div className={className}>
			<h4>{history.length ? 'История прохождений' : 'Нет истории'}</h4>
			<div className="test-history">
				{/*TODO maybe HOC*/}
				{history.map(({ id, testDate, testTime, results, user }) => (
					<TestResult
						key={id}
						user={user.surname + ' ' + user.name}
						testDate={testDate}
						testTime={testTime}
						testResult={results}
					></TestResult>
				))}
			</div>
		</div>
	);
};

export const History = styled(HistoryContainer)`
	padding-bottom: 150px;

	.test-history {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;
