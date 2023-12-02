import { ACTION_TYPE } from '../actions';

const initialHistoryState = {
	history: [],
};

export const historyReducer = (state = initialHistoryState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_HISTORY:
			return {
				...state,
				history: action.payload,
			};

		default:
			return state;
	}
};
