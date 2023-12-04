export const countNumberCorrectAnswers = (data, separator) => {
	const rightAnswersCount = data.filter(answer => answer.result).length;

	const countQuestions = data.length;

	return `${rightAnswersCount}${separator}${countQuestions}`;
};
