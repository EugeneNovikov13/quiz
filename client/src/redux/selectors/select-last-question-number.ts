import { RootState } from '../store';

export const selectLastQuestionNumber = ({ question }: RootState) =>
	question.lastQuestionNumber;
