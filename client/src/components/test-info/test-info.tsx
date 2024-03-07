import styled from 'styled-components';
import { FC } from 'react';

interface TestInfoProps {
	className?: string;
	title: string;
	author?: string;
	createdAt: string;
	questionsCount: number;
}

const TestInfoContainer: FC<TestInfoProps> = ({
	className,
	title,
	author,
	createdAt,
	questionsCount,
}) => {
	return (
		<div className={className}>
			<h2 className="title">{title}</h2>
			<p>Количество вопросов: {questionsCount}</p>
			{author && <p>Автор теста: {author}</p>}
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

	h2 {
		max-height: 100px;
		overflow: hidden;
	}

	& p {
		font-weight: 500;
	}
`;
