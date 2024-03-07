import { AppAction, AppActionTypes, IAppState } from '../../types/app-reducer-types';

const initialAppState: IAppState = {
	wasLogin: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
		isError: false,
	},
};

export const appReducer = (state = initialAppState, action: AppAction): IAppState => {
	switch (action.type) {
		case AppActionTypes.LOGOUT:
			return {
				...state,
				wasLogin: false,
			};

		case AppActionTypes.SET_USER:
			return {
				...state,
				wasLogin: true,
			};

		case AppActionTypes.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};

		case AppActionTypes.CLOSE_MODAL:
			return {
				...state,
				modal: initialAppState.modal,
			};

		default:
			return state;
	}
};
