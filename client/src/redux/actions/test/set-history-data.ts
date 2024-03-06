import { History, TestAction, TestActionTypes } from '../../../types';

export const setHistoryData = (historyData: History[]): TestAction => ({
	type: TestActionTypes.SET_HISTORY,
	payload: historyData,
});
