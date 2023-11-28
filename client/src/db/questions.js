export const QUESTIONS = [
	{
		id: '001',
		question:
			'Товарищ, добрый день. А ну попробуй отгадай. Сколько будет один плюс один? Только не подглядывай.',
		answers: [
			{
				id: '001',
				text: 'Если ты точно уверен, что будет два, жми сюда!',
				isCorrect: true,
			},
			{ id: '002', text: 'Три', isCorrect: false },
			{ id: '003', text: 'Один', isCorrect: false },
		],
	},
	{
		id: '002',
		question: 'Сколько будет два плюс один?',
		answers: [
			{ id: '001', text: 'Два', isCorrect: false },
			{ id: '002', text: 'Три', isCorrect: true },
			{ id: '003', text: 'Один', isCorrect: false },
		],
	},
	{
		id: '003',
		question: 'Сколько будет два плюс два?',
		answers: [
			{ id: '001', text: 'Два', isCorrect: false },
			{ id: '002', text: 'Три', isCorrect: false },
			{ id: '003', text: 'Один', isCorrect: false },
			{ id: '004', text: 'Четыре', isCorrect: true },
		],
	},
];
