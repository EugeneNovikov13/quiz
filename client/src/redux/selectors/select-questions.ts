import { RootState } from '../store';

export const selectQuestions = ({ test }: RootState) => test.test.questions;
