import styled from 'styled-components';
import { FC, ReactNode } from 'react';

interface NavBarProps {
	className?: string;
	children: ReactNode;
	readyToComplete?: boolean;
}

const NavBarContainer: FC<NavBarProps> = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const NavBar = styled(NavBarContainer)`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
	padding: 20px 0;

	& button {
		height: 65px;
		color: #000;
		background-color: #fff;
		border: 1px solid #ccc;
	}

	& button:hover {
		border: none;
		background-color: #000;
		color: #fff;
		box-shadow: 0 4px 2px -1px rgba(188, 188, 188, 1);
	}

	& button.right-button {
		background-color: ${({ readyToComplete }) =>
			readyToComplete ? 'lightgreen' : ''};
	}

	& button.right-button:hover {
		filter: ${({ readyToComplete }) => (readyToComplete ? 'brightness(0.9)' : '')};
	}
`;
