import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createArrayFromNumber, loadTestsAsync } from '../../utils';
import { selectAppWasLogin } from '../../redux/selectors';
import { Button, TestInfo } from '../../components';
import { Pagination } from './components';
import styled from 'styled-components';
import { QUESTIONS_AMOUNT_TO_LOAD } from '../../constants';

const MainContainer = ({ className }) => {
	const [tests, setTests] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const pages = createArrayFromNumber(lastPage);

	const wasLogin = useSelector(selectAppWasLogin);

	useEffect(() => {
		loadTestsAsync(
			null,
			QUESTIONS_AMOUNT_TO_LOAD.MAIN_PAGE_PAGINATION_LIMIT,
			page,
		).then(({ data: { tests, lastPage } }) => {
			setTests(tests);
			setLastPage(lastPage);
		});
	}, [page]);

	return (
		<div className={className}>
			<div className="tests">
				{tests.map(({ id, title, createdAt, author, questions }) => (
					<div className="test" key={id}>
						<TestInfo
							title={title}
							createdAt={createdAt}
							author={author.surname + ' ' + author.name}
							questionsCount={questions.length}
						/>
						{wasLogin && (
							<Button
								link={`/test/${id}`}
								activeColor="#000"
								width="160px"
								height="35px"
								fontSize="16px"
							>
								Открыть
							</Button>
						)}
					</div>
				))}
			</div>
			<Pagination pages={pages} page={page} setPage={setPage} />
		</div>
	);
};

export const Main = styled(MainContainer)`
	max-width: 940px;
	min-width: 360px;
	display: flex;
	flex-direction: column;
	gap: 20px;

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
		max-height: 300px;
		padding: 5px;
		border: 2px solid #ccc;
		border-radius: 10px;
		transition: 0.3s;
	}

	& .test:hover {
		transform: scale(1.05);
	}
`;
