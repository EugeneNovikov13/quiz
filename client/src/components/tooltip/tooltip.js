import styled from 'styled-components';

const TooltipContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const Tooltip = styled(TooltipContainer)`
	position: absolute;
	top: ${({ tooltipPosition }) => tooltipPosition.y}px;
	right: ${({ tooltipPosition }) => tooltipPosition.x}px;
	display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
	flex-direction: column;
	gap: 5px;
	border: 1px solid #000;
	border-radius: 5px;
	background: white;
	padding: 8px;
	z-index: 10;
`;
