export const correctAnswerCounting = results =>
	results.filter(({ isCorrect }) => isCorrect).length;
