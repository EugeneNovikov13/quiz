import { Route, Routes } from 'react-router-dom';
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
import { Error, Header, Modal } from './components';
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
	max-width: 1000px;
	min-width: 360px;
	min-height: calc(100vh - 70px);
	margin: 0 auto;
	padding: 50px 20px;
	background-color: #fff;
`;

export const Quiz = () => {
	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/login" alement={<Authorization />}></Route>
					<Route path="/register" element={<Registration />}></Route>
					<Route path="/test/:id" element={<Test />}></Route>
					<Route path="/question/:id" element={<Question />}></Route>
					<Route path="/result" element={<Result />}></Route>
					<Route path="/user-tests" element={<UserTests />}></Route>
					<Route path="/edit" element={<Edit />}></Route>
					<Route path="/account" element={<Account />}></Route>
					<Route
						path="*"
						element={<Error error={ERROR.PAGE_NOT_EXIST} />}
					></Route>
				</Routes>
			</Page>
			<Modal />
		</AppColumn>
	);
};
