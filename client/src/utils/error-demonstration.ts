import { CLOSE_MODAL, openModal } from '../redux/actions/app';
import { Dispatch } from 'redux';

//демонстрация ошибки в модальном окне
export const errorDemonstration = (dispatch: Dispatch, error: string): void => {
	dispatch(
		openModal({
			text: error,
			onConfirm: () => dispatch(CLOSE_MODAL()),
			onCancel: () => dispatch(CLOSE_MODAL()),
			isError: true,
		}),
	);
};
