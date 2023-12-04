export const checkTestResult = (data, result) =>
	result.map((answer, index) => ({
		id: data[index].id,
		question: data[index].text,
		answer: result[index],
		result: data[index].correctAnswer === result[index],
	}));
