import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER } from './redux/actions/app';
import {
	Account,
	Authorization,
	Edit,
	Main,
	Question,
	Registration,
	Result,
	Test,
	UserTests,
} from './pages';
import { ErrorMessage, Header, Modal } from './components';
import { ERROR } from './constants';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	max-width: 1000px;
	min-width: 400px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	display: flex;
	justify-content: center;
	max-width: 1000px;
	min-width: 360px;
	min-height: calc(100vh - 70px);
	padding: 50px 30px;
	background-color: #fff;
`;

export const Quiz = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		dispatch(SET_USER());
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/authorization" element={<Authorization />}></Route>
					<Route path="/registration" element={<Registration />}></Route>
					<Route path="/test/:id" element={<Test />}></Route>
					<Route
						path="/test/:id/question/:pageId"
						element={<Question />}
					></Route>
					<Route path="/result" element={<Result />}></Route>
					<Route path="/user-tests" element={<UserTests />}></Route>
					<Route path="/edit" element={<Edit />}></Route>
					<Route path="/edit/:id" element={<Edit />}></Route>
					<Route path="/account" element={<Account />}></Route>
					<Route
						path="*"
						element={<ErrorMessage message={ERROR.PAGE_NOT_EXIST} />}
					></Route>
				</Routes>
			</Page>
			<Modal />
		</AppColumn>
	);
};
