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
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '24px')};
	width: ${({ width }) => (width ? width : '350px')};
	height: ${({ height }) => (height ? height : '50px')};
	border-radius: 5px;
	border: none;
	color: ${({ activeColor }) => (activeColor ? '#fff' : '#000')};
	background-color: ${({ activeColor, isDisable }) =>
		!isDisable ? activeColor : '#ccc'};

	&:hover {
		cursor: ${({ isDisable }) => (isDisable ? '' : 'pointer')};
		filter: ${({ isDisable }) => (!isDisable ? 'brightness(0.9)' : '')};
		box-shadow: 0 4px 2px -1px rgba(188, 188, 188, 1);
	}
`;
