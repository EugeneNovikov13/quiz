import { HISTORY } from '../../../../constants';
import { TestResult } from './components';
import styled from 'styled-components';

const HistoryContainer = ({ className }) => {
	return (
		<div className={className}>
			<h4>История прохождений</h4>
			<div className="test-history">
				{HISTORY.map(({ id, date, results }) => (
					<TestResult
						key={id}
						testDate={date[0]}
						testTime={date[1]}
						results={results}
					></TestResult>
				))}
			</div>
		</div>
	);
};

export const History = styled(HistoryContainer)`
	.test-history {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;
