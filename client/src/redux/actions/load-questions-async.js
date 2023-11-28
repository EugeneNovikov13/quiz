import { QUESTIONS } from '../../db';
import { ACTION_TYPE } from './action-type';

export const loadQuestionsAsync = () => dispatch => {
	new Promise(resolve => resolve(QUESTIONS)).then(questions => {
		dispatch({
			type: ACTION_TYPE.SET_TEST_DATA,
			payload: questions,
		});
	});
};
