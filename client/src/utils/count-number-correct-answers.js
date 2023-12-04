export const countNumberCorrectAnswers = data => {
	const rightAnswersCount = data.testResult.filter(answer => answer.result).length;

	const countQuestions = data.testResult.length;

	return `${rightAnswersCount}/${countQuestions}`;
};
