import { CLOSE_MODAL, openModal } from '../redux/actions';

//демонстрация ошибки в модальном окне
export const errorDemonstration = (dispatch, error) => {
	dispatch(
		openModal({
			text: error,
			onConfirm: () => dispatch(CLOSE_MODAL),
			onCancel: () => dispatch(CLOSE_MODAL),
			isError: true,
		}),
	);
};
