export const generateTestResult = (data, result) =>
	result.map((answer, index) => ({
		question: data[index].text,
		userAnswer: result[index],
		result: data[index].correctAnswer === result[index],
	}));
