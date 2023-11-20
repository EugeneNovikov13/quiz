import styled from 'styled-components';

const NavigateButtonContainer = ({ className, children, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export const NavigateButton = styled(NavigateButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	width: 350px;
	height: 50px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: ${({ disabled, activeColor }) => (disabled ? '#ccc' : activeColor)};
	color: #000;

	&:hover {
		border: none;
		background-color: #000;
		color: #fff;
		box-shadow: 0 4px 2px -1px rgba(188, 188, 188, 1);
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;
