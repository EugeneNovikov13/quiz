import { RootState } from '../store';

export const selectAppWasLogin = ({ app }: RootState) => app.wasLogin;
