import { RootState } from '../store';

export const selectModalIsError = ({ app }: RootState) => app.modal.isError;
