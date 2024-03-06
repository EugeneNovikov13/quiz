import { request } from '../../../utils';
import { ITest, TestAction, TestActionTypes } from '../../../types';
import { Dispatch } from 'redux';

export const updateTestAsync = (test: ITest) => (dispatch: Dispatch<TestAction>) =>
	request<ITest>(`/tests/${test.id}`, 'PATCH', {
		title: test.title,
		questions: test.questions,
	}).then(res => {
		if (res.data) {
			dispatch({
				type: TestActionTypes.SET_TEST_DATA,
				payload: res.data,
			});
		}

		return res;
	});
