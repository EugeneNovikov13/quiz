import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createArrayFromNumber,
	deleteTestAsync,
	errorDemonstration,
	loadTestsAsync,
} from '../../utils';
import { CLOSE_MODAL, openModal } from '../../redux/actions/app';
import { selectTestData } from '../../redux/selectors';
import { Button, PrivateContent, TestInfo } from '../../components';
import { Pagination } from '../main/components';
import { QUESTIONS_AMOUNT_TO_LOAD } from '../../constants';
import styled from 'styled-components';
import { ITest, IUser } from '../../types';
import { AppThunkDispatch } from '../../redux/store';

interface UserTestsProps {
	className?: string;
}

const UserTestsContainer: FC<UserTestsProps> = ({ className }) => {
	const [tests, setTests] = useState<ITest[]>([]);
	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(1);
	//требование перезапроса тестов из БД после удаления теста
	const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const dispatch: AppThunkDispatch = useDispatch();

	const pages = createArrayFromNumber(lastPage);

	const userData = sessionStorage.getItem('userData');
	const user: IUser = userData && JSON.parse(userData);
	const test = useSelector(selectTestData);

	useEffect(() => {
		if (!user) return;

		//тесты пользователя запрашиваются, если пользователь авторизован
		loadTestsAsync(
			user.id,
			QUESTIONS_AMOUNT_TO_LOAD.USER_TEST_PAGE_PAGINATION_LIMIT,
			page,
		)
			.then(({ data }) => {
				if (data) {
					const { tests, lastPage } = data;
					setTests(tests);
					setLastPage(lastPage);
					setIsLoading(false);
				}
			})
			.catch(e => {
				console.log(e.message);
			});
		// eslint-disable-next-line
	}, [page, test, shouldRefresh]);

	//Вызывает модальное окно, чтобы подтвердить удаление теста из БД
	const onTestDelete = (testId: ITest['id']) => {
		dispatch(
			openModal({
				text: 'Удалить тест?',
				onConfirm: () => {
					deleteTestAsync(testId).then(res => {
						if (res.error) errorDemonstration(dispatch, res.error);
						setShouldRefresh(!shouldRefresh);
					});
					dispatch(CLOSE_MODAL());
				},
				onCancel: () => dispatch(CLOSE_MODAL()),
			}),
		);
	};

	const buttonStyleProps = { width: '160px', height: '35px', fontSize: '16px' };

	return (
		<PrivateContent>
			{!isLoading && (
				<div className={className}>
					<div className="header">
						<h1>Мои тесты</h1>
						<Button link={'/edit'} activeColor="#000" {...buttonStyleProps}>
							Создать тест
						</Button>
					</div>
					<div className="tests">
						{tests.map(({ id, title, createdAt, questions }) => (
							<div className="test" key={id}>
								<TestInfo
									title={title}
									createdAt={createdAt}
									questionsCount={questions.length}
								/>
								<Button
									link={`/test/${id}`}
									activeColor="#000"
									{...buttonStyleProps}
								>
									Открыть
								</Button>
								<Button
									link={`/edit/${id}`}
									activeColor="#5B90FDFF"
									{...buttonStyleProps}
								>
									Редактировать
								</Button>
								<Button
									activeColor="#bc2121"
									{...buttonStyleProps}
									onClick={() => onTestDelete(id)}
								>
									Удалить
								</Button>
							</div>
						))}
					</div>
					{lastPage > 1 && (
						<Pagination pages={pages} page={page} setPage={setPage} />
					)}
				</div>
			)}
		</PrivateContent>
	);
};

export const UserTests = styled(UserTestsContainer)`
	width: 940px;
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
