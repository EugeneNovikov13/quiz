import { IResult } from '../types';

export default function (result: IResult): IResult {
	return {
		id: result.id,
		question: result.question,
		userAnswer: result.userAnswer,
		result: result.result,
	}
}
