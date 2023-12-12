import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadHistoryAsync, loadTestAsync } from '../../redux/actions';
import { selectAppWasLogin } from '../../redux/selectors';
import { selectTestData } from '../../redux/selectors/select-test-data';
import { selectTestHistory } from '../../redux/selectors/select-test-history';
import { History } from './components';
import { Button, PrivateContent, TestInfo } from '../../components';
import styled from 'styled-components';

const TestContainer = ({ className }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const params = useParams();
	const dispatch = useDispatch();
	const wasLogin = useSelector(selectAppWasLogin);

	const test = useSelector(selectTestData);
	const history = useSelector(selectTestHistory);

	useEffect(() => {
		if (!wasLogin) {
			return;
		}

		Promise.all([
			dispatch(loadTestAsync(params.id)),
			dispatch(loadHistoryAsync(params.id)),
		]).then(([testData, historyData]) => {
			if (testData.error || historyData.error) {
				setErrorMessage(testData.error || historyData.error);
			}
		});
	}, [dispatch, params.id, wasLogin]);

	return (
		<PrivateContent serverError={errorMessage}>
			<div className={className}>
				<TestInfo
					title={test.title}
					createdAt={test.createdAt}
					author={test.author.surname + ' ' + test.author.name}
					questionsCount={test.questions.length}
				/>
				<Link to={`/test/${params.id}/question/1`}>
					<Button
						activeColor="#000"
						width="200px"
						height="40px"
						fontSize="20px"
					>
						Запустить тест
					</Button>
				</Link>
				<History history={history} />
			</div>
		</PrivateContent>
	);
};

export const Test = styled(TestContainer)`
	width: 100%;
`;
