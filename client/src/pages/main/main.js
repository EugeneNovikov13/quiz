import { useEffect, useState } from 'react';
import { createArrayFromNumber, request } from '../../utils';
import { Pagination } from './components';
import { Button, TestInfo } from '../../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [tests, setTests] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const pages = createArrayFromNumber(lastPage);

	useEffect(() => {
		request(`/tests?limit=12&page=${page}`).then(({ data: { tests, lastPage } }) => {
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
						<Link to={`/test/${id}`}>
							<Button
								children={'Открыть'}
								onClick={() => {}}
								activeColor="#000"
								width="140px"
								height="35px"
								fontSize="16px"
							/>
						</Link>
					</div>
				))}
			</div>
			<Pagination pages={pages} page={page} setPage={setPage} />
		</div>
	);
};

export const Main = styled(MainContainer)`
	max-width: 960px;
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
		width: 228px;
		height: 240px;
		padding: 5px;
		border: 2px solid #ccc;
		border-radius: 10px;
		transition: 0.3s;
	}

	& .test:hover {
		transform: scale(1.05);
	}
`;
