export function findQuestionById(searchedId, questions) {
	return questions.find(ques => ques.id === searchedId);
}
