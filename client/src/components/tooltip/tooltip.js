import styled from 'styled-components';

const TooltipContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const Tooltip = styled(TooltipContainer)`
	display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
	flex-direction: column;
	gap: 5px;
	position: absolute;
	top: ${({ mousePosition }) => mousePosition.y + 10}px;
	left: ${({ mousePosition }) => mousePosition.x - 75}px;
	border: 1px solid #000;
	border-radius: 5px;
	background: white;
	padding: 8px;
	z-index: 10;
`;
