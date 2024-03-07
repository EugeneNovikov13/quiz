import { CLOSE_MODAL, openModal } from '../redux/actions/app';
import { AppThunkDispatch } from '../redux/store';

//демонстрация ошибки в модальном окне
export const errorDemonstration = (dispatch: AppThunkDispatch, error: string): void => {
	dispatch(
		openModal({
			text: error,
			onConfirm: () => dispatch(CLOSE_MODAL()),
			onCancel: () => dispatch(CLOSE_MODAL()),
			isError: true,
		}),
	);
};
