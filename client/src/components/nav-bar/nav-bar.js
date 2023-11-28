import styled from 'styled-components';

const NavBarContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const NavBar = styled(NavBarContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 20px 0;

	& button {
		background-color: ${({ bgColor }) => (bgColor ? bgColor : '#fff')};
		border: ${({ bgColor }) => (bgColor ? 'none' : '1px solid #ccc')};
		color: #000;
	}

	& button:hover {
		filter: ${({ brightness }) => (brightness ? 'brightness(0.9)' : 'none')};
		border: none;
		background-color: #000;
		color: ${({ brightness }) => (brightness ? '#000' : '#fff')};
		box-shadow: 0 4px 2px -1px rgba(188, 188, 188, 1);
	}

	& button.right-button {
		background-color: ${readyToComplete => (readyToComplete ? 'lightgreen' : '')};
	}
`;
