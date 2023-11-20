export const QUESTIONS = [
	{
		id: '001',
		question: '1+1',
		answers: [
			{ id: '001', text: '2', result: true },
			{ id: '002', text: '3', result: false },
			{ id: '003', text: '1', result: false },
		],
	},
	{
		id: '002',
		question: '2+1',
		answers: [
			{ id: '001', text: '2', result: false },
			{ id: '002', text: '3', result: false },
			{ id: '003', text: '1', result: true },
		],
	},
	{
		id: '003',
		question: '2+2',
		answers: [
			{ id: '001', text: '2', result: false },
			{ id: '002', text: '3', result: false },
			{ id: '003', text: '1', result: false },
			{ id: '004', text: '4', result: true },
		],
	},
];
