import styled from 'styled-components';

const TestInfoContainer = ({ className, title, author, createdAt, questionsCount }) => {
	return (
		<div className={className}>
			<h2 className="title">{title}</h2>
			<p>Количество вопросов: {questionsCount}</p>
			<p>Автор теста: {author}</p>
			<p>Дата создания: {createdAt}</p>
		</div>
	);
};

export const TestInfo = styled(TestInfoContainer)`
	display: flex;
	flex-direction: column;
	gap: 5px;
	min-height: 140px;
	margin-bottom: 10px;

	& h2,
	p {
		margin: 0;
	}

	& p {
		font-weight: 500;
	}
`;
