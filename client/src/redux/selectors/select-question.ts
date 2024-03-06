import { RootState } from '../store';

export const selectQuestion = ({ question }: RootState) => question.question;
