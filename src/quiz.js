import { Route, Routes } from 'react-router-dom';
import { Error } from './components';
import { Edit, Main, Question, Result } from './pages';
import { ERROR } from './constants';
import styled from 'styled-components';

const Page = styled.div`
	width: 800px;
	margin: 20px auto;
	padding: 50px 20px;
	background-color: #eee;
`;

export const Quiz = () => {
	return (
		<Page>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/question" element={<Question />}></Route>
				<Route path="/question/:id" element={<Question />}></Route>
				<Route path="/result" element={<Result />}></Route>
				<Route path="/edit" element={<Edit />}></Route>
				<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />}></Route>
			</Routes>
		</Page>
	);
};
