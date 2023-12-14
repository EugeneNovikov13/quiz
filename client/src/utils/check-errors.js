export const checkErrors = (title, questions) => {
	let isError = false;

	if (title.length === 0 || questions.length === 0) {
		return true;
	}

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
