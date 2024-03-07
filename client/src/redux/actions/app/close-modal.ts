import { AppAction, AppActionTypes } from '../../../types/app-reducer-types';

export const CLOSE_MODAL = (): AppAction => ({
	type: AppActionTypes.CLOSE_MODAL,
});
