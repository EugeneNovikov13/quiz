import { IModal } from '../../../types/modal-types';
import { AppAction, AppActionTypes } from '../../../types/app-reducer-types';

export const openModal = (modalParams: IModal): AppAction => ({
	type: AppActionTypes.OPEN_MODAL,
	payload: modalParams,
});
