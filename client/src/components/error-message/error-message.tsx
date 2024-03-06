import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 18px;
`;

export const ErrorMessage = ({ message }: { message: string }) =>
	message && (
		<Div>
			<h2>Ошибка</h2>
			<div>{message}</div>
		</Div>
	);
