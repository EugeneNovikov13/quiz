import { ACTION_TYPE } from './action-type';
import { request } from '../../utils';

export const loadQuestionsAsync = () => dispatch => {
	request('/questions').then(({ data }) => {
		console.log(data);
		dispatch({
			type: ACTION_TYPE.SET_TEST_DATA,
			payload: data.questions,
		});
	});
};
