import styled from 'styled-components';

const ButtonContainer = ({ className, children, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
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

	&:hover {
		cursor: pointer;
	}
`;
