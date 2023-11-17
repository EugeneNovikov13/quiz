import styled from 'styled-components';

const TooltipContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const Tooltip = styled(TooltipContainer)`
	display: ${({ isHovered }) => (isHovered ? 'block' : 'none')};
	position: absolute;
	top: ${({ mousePosition }) => mousePosition.y - 60}px;
	left: ${({ mousePosition }) => mousePosition.x - 300}px;
	border: 1px solid #000;
	border-radius: 5px;
	background: white;
	padding: 8px;
	z-index: 10;
`;
