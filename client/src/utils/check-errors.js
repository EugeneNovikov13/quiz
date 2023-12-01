export const checkErrors = questions => {
	let isError = false;

	questions.forEach(ques => {
		if (
			ques.text === '' ||
			ques.correctAnswer === '' ||
			ques.answers.length === 0 ||
			ques.answers.some(ans => ans.text === '') ||
			!ques.answers.some(ans => ans.text === ques.correctAnswer)
		) {
			isError = true;
		}
	});

	return isError;
};
