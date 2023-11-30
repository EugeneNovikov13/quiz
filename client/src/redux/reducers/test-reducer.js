import { ACTION_TYPE } from '../actions';

const initialTestState = {
	questions: [],
};

export const testReducer = (state = initialTestState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TEST_DATA:
			return {
				...state,
				questions: action.payload,
			};

		default:
			return state;
	}
};
