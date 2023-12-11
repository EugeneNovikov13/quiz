import { ACTION_TYPE } from './action-type';

export const setHistoryData = historyData => ({
	type: ACTION_TYPE.SET_HISTORY,
	payload: historyData,
});
