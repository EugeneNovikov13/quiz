import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createArrayFromNumber, request } from '../../utils';
import { CLOSE_MODAL, deleteTestAsync, openModal } from '../../redux/actions';
import { selectUserId } from '../../redux/selectors';
import { Button, PrivateContent, TestInfo } from '../../components';
import { Pagination } from '../main/components';
import { QUESTIONS_AMOUNT_TO_LOAD } from '../../constants';
import styled from 'styled-components';

const UserTestsContainer = ({ className }) => {
	const [tests, setTests] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldRefresh, setShouldRefresh] = useState(false);

	const dispatch = useDispatch();

	const pages = createArrayFromNumber(lastPage);

	const userId = useSelector(selectUserId);

	useEffect(() => {
		request(
			`/tests?user=${userId}&limit=${QUESTIONS_AMOUNT_TO_LOAD.USER_TEST_PAGE_PAGINATION_LIMIT}&page=${page}`,
		).then(({ data: { tests, lastPage } }) => {
			setTests(tests);
			setLastPage(lastPage);
		});
	}, [page, userId, shouldRefresh]);

	const errorDemonstration = error => {
		dispatch(
			openModal({
				text: error,
				onConfirm: () => dispatch(CLOSE_MODAL),
				onCancel: () => dispatch(CLOSE_MODAL),
				isError: true,
			}),
		);
	};

	const onTestDelete = testId => {
		dispatch(
			openModal({
				text: 'Удалить тест?',
				onConfirm: () => {
					deleteTestAsync(testId).then(res => {
						if (res.error) errorDemonstration(res.error);
					});
					setShouldRefresh(!shouldRefresh);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<PrivateContent>
			<div className={className}>
				<div className="header">
					<h1>Мои тесты</h1>
					<Link to="/edit">
						<Button
							activeColor="#000"
							width="160px"
							height="35px"
							fontSize="16px"
						>
							Создать тест
						</Button>
					</Link>
				</div>
				<div className="tests">
					{tests.map(({ id, title, createdAt, questions }) => (
						<div className="test" key={id}>
							<TestInfo
								title={title}
								createdAt={createdAt}
								questionsCount={questions.length}
							/>
							<Link to={`/test/${id}`}>
								<Button
									activeColor="#000"
									width="160px"
									height="35px"
									fontSize="16px"
								>
									Открыть
								</Button>
							</Link>
							<Link to={`/edit/${id}`}>
								<Button
									activeColor="#5B90FDFF"
									width="160px"
									height="35px"
									fontSize="16px"
								>
									Редактировать
								</Button>
							</Link>
							<Button
								activeColor="#bc2121"
								width="160px"
								height="35px"
								fontSize="16px"
								onClick={() => onTestDelete(id)}
							>
								Удалить
							</Button>
						</div>
					))}
				</div>
				<Pagination pages={pages} page={page} setPage={setPage} />
			</div>
		</PrivateContent>
	);
};

export const UserTests = styled(UserTestsContainer)`
	width: 960px;
	min-width: 360px;
	display: flex;
	flex-direction: column;
	gap: 20px;

	& .header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-top: -20px;
	}

	& h1 {
		margin: 0;
		line-height: 22px;
	}

	& .tests {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		min-height: 752px;
	}

	& .test {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 223px;
		min-height: 240px;
		height: 300px;
		padding: 5px;
		border: 2px solid #ccc;
		border-radius: 10px;
		transition: 0.3s;
	}

	& .test:hover {
		transform: scale(1.05);
	}
`;
