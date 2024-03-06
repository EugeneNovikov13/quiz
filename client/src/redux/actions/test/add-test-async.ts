import { request } from '../../../utils';
import { ITest, TestAction, TestActionTypes } from '../../../types';
import { Dispatch } from 'redux';

export const addTestAsync = (test: ITest) => async (dispatch: Dispatch<TestAction>) =>
	request<ITest>('/tests', 'POST', {
		title: test.title,
		questions: test.questions,
	}).then(res => {
		if (res.data) {
			dispatch({
				type: TestActionTypes.RESET_TEST_DATA,
			});
		}

		return res;
	});
