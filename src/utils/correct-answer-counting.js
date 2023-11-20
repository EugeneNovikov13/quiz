export const correctAnswerCounting = results =>
	results.filter(({ result }) => result).length;
