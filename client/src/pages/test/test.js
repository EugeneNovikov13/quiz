import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAppWasLogin,
	selectTestData,
	selectTestHistory,
} from '../../redux/selectors';
import { History } from './components';
import { Button, PrivateContent, TestInfo } from '../../components';
import styled from 'styled-components';
import { loadHistoryAsync, loadTestAsync } from '../../redux/actions/test';

const TestContainer = ({ className }) => {
	const [errorMessage, setErrorMessage] = useState('');
	const params = useParams();
	const dispatch = useDispatch();
	const wasLogin = useSelector(selectAppWasLogin);

	const test = useSelector(selectTestData);
	const history = useSelector(selectTestHistory);

	useEffect(() => {
		if (!wasLogin) {
			return;
		}

		//Запрашиваем данные теста и его истории из БД
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
				<Button
					link={`/test/${params.id}/question/1`}
					activeColor="#000"
					width="200px"
					height="40px"
					fontSize="20px"
				>
					Запустить тест
				</Button>
				<History history={history} />
			</div>
		</PrivateContent>
	);
};

export const Test = styled(TestContainer)`
	width: 100%;
`;
