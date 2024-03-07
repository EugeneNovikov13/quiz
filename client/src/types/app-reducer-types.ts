import { IModal } from './modal-types';

export interface IAppState {
	wasLogin: boolean;
	modal: IModal;
}

export enum AppActionTypes {
	LOGOUT = 'LOGOUT',
	SET_USER = 'SET_USER',
	OPEN_MODAL = 'OPEN_MODAL',
	CLOSE_MODAL = 'CLOSE_MODAL',
}

interface ILogout {
	type: AppActionTypes.LOGOUT;
}

interface ISetUser {
	type: AppActionTypes.SET_USER;
}

interface IOpenModal {
	type: AppActionTypes.OPEN_MODAL;
	payload: IModal;
}

interface ICloseModal {
	type: AppActionTypes.CLOSE_MODAL;
}

export type AppAction = ILogout | ISetUser | IOpenModal | ICloseModal;
