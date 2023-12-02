import styled from 'styled-components';

const ButtonContainer = ({ className, children, isDisable, onClick }) => {
	return (
		<button className={className} disabled={isDisable} onClick={onClick}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	width: 350px;
	height: 50px;
	border-radius: 5px;
	border: none;
	background-color: ${({ activeColor, isDisable }) =>
		!isDisable ? activeColor : '#ccc'};

	&:hover {
		cursor: ${({ isDisable }) => (isDisable ? '' : 'pointer')};
		filter: ${({ isDisable }) => (!isDisable ? 'brightness(0.9)' : '')};
	}
`;
