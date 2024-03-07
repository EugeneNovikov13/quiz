import { RootState } from '../store';

export const selectTestHistory = ({ test }: RootState) => test.history;
