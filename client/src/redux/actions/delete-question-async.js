import { ACTION_TYPE } from './action-type';
import { request } from '../../utils';

export const deleteQuestionAsync = id => dispatch => {
	request(`/questions/${id}`, 'DELETE').then(() => {
		dispatch({
			type: ACTION_TYPE.DELETE_QUESTION,
			payload: { id },
		});
	});
};
