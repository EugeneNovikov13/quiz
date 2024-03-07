import { RootState } from '../store';

export const selectTestData = ({ test }: RootState) => test.test;
