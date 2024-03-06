import { Action, ActionCreator, Dispatch } from 'redux';
import { History, Result, Test, TestAction, TestActionTypes } from '../../../types';
import { request, ResponseType } from '../../../utils';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';

type FetchDataThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	// unknown,
	null,
	Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<RootState, null, TestAction>;

export const addHistoryAsync: ActionCreator<
	FetchDataThunkAction<Promise<ResponseType<History>>>
> =
	(testId: Test['id'], results: Omit<Result, 'id'>[]) =>
	async (dispatch: AppThunkDispatch) => {
		const asyncResp = await request<History>('/histories', 'POST', {
			test: testId,
			results,
		});
		// 	.then(res => {
		// 	if (res.data) {
		// 		dispatch({
		// 			type: TestActionTypes.SET_HISTORY,
		// 			payload: [res.data],
		// 		});
		// 	}
		//
		// 	return res;
		// });
		if (asyncResp.data) {
			dispatch({
				type: TestActionTypes.SET_HISTORY,
				payload: [asyncResp.data],
			});
		}

		return asyncResp;
	};

export function asyncAction3(): FetchDataThunkAction {
	return (dispatch: AppThunkDispatch) => {
		dispatch(addHistoryAsync('', [])).then(result => console.log(result)); // no type errors!
	};
}
