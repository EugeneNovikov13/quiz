import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createArrayFromNumber, loadTestsAsync } from '../../utils';
import { selectAppWasLogin } from '../../redux/selectors';
import { Button, TestInfo } from '../../components';
import { Pagination } from './components';
import { QUESTIONS_AMOUNT_TO_LOAD } from '../../constants';
import styled from 'styled-components';
import { ITest } from '../../types';

interface MainProps {
	className?: string;
}

const MainContainer: FC<MainProps> = ({ className }) => {
	const [tests, setTests] = useState<ITest[]>([]);
	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);

	const pages = createArrayFromNumber(lastPage);

	const wasLogin = useSelector(selectAppWasLogin);

	useEffect(() => {
		loadTestsAsync(
			'',
			QUESTIONS_AMOUNT_TO_LOAD.MAIN_PAGE_PAGINATION_LIMIT,
			page,
		).then(({ data }) => {
			if (data) {
				const { tests, lastPage } = data;
				setTests(tests);
				setLastPage(lastPage);
			}
		});
	}, [page]);

	return (
		<div className={className}>
			{!wasLogin && (
				<span className="need-to-auth">
					* чтобы посмотреть возможности приложения, авторизуйтесь: электронная
					почта - it-test@bk.ru, пароль - gfhjkm1
				</span>
			)}
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
			{lastPage > 1 && <Pagination pages={pages} page={page} setPage={setPage} />}
		</div>
	);
};

export const Main = styled(MainContainer)`
	max-width: 940px;
	min-width: 360px;
	display: flex;
	flex-direction: column;
	gap: 20px;

	& .need-to-auth {
		color: #4d4d9f;
	}

	& .tests {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px;
		min-height: 600px;
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
