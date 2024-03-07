import { AppAction, AppActionTypes } from '../../../types/app-reducer-types';

export const LOGOUT = (): AppAction => ({
	type: AppActionTypes.LOGOUT,
});
