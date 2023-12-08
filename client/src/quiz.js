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
import { Error, Modal } from './components';
import { ERROR } from './constants';
import styled from 'styled-components';

const Page = styled.div`
	width: 800px;
	min-height: calc(100vh - 40px);
	margin: 20px auto;
	padding: 50px 20px;
	background-color: #eee;
`;

export const Quiz = () => {
	return (
		<>
			<Page>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/login" alement={<Authorization />}></Route>
					<Route path="/register" element={<Registration />}></Route>
					<Route path="/test" element={<Test />}></Route>
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
		</>
	);
};
