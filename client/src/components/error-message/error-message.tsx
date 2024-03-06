import styled from 'styled-components';
import { FC } from 'react';

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 18px;
`;

interface ErrorMessageProps {
	message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) =>
	message && (
		<Div>
			<h2>Ошибка</h2>
			<div>{message}</div>
		</Div>
	);
