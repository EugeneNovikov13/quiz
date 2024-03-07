import { RootState } from '../store';

export const selectEditedQuestions = ({ test }: RootState) => test.editedQuestions;
