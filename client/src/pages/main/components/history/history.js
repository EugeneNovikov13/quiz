import { getItemFromLocalStorage } from '../../../../utils';
import { TestResult } from './components';
import styled from 'styled-components';

const HistoryContainer = ({ className }) => {
	const history = getItemFromLocalStorage('history') || [];

	return (
		<div className={className}>
			<h4>{history.length ? 'История прохождений' : 'Нет истории'}</h4>
			<div className="test-history">
				{history.map(({ id, createdDate, createdTime, testResult }) => (
					<TestResult
						key={id}
						testDate={createdDate}
						testTime={createdTime}
						testResult={testResult}
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
