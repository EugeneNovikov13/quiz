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
		color: #000;
		${({ isMonochrome }) =>
			isMonochrome
				? 'background-color: #fff; border: 1px solid #ccc;'
				: 'background-color: #ccc; border: none;'}
	}

	& button:hover {
		border: none;
		${({ isMonochrome }) =>
			isMonochrome
				? 'filter: brightness(0.9);' +
				  'background-color: #000;' +
				  'color: #fff;' +
				  'box-shadow: 0 4px 2px -1px rgba(188, 188, 188, 1);'
				: 'color: #000;'}
	}

	& button.right-button,
	button.right-button:hover {
		background-color: ${({ readyToComplete }) =>
			readyToComplete ? 'lightgreen' : ''};
	}
`;
