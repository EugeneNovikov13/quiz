import styled from 'styled-components';

const TooltipContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const Tooltip = styled(TooltipContainer)`
	position: absolute;
	top: ${({ tooltipPosition }) => tooltipPosition.top}px;
	right: ${({ tooltipPosition }) => tooltipPosition.right}px;
	display: ${({ isHovered }) => (isHovered ? 'flex' : 'none')};
	flex-direction: column;
	border: ${({ isInvisible }) => (isInvisible ? 'none' : '1px solid #000')};
	border-radius: 5px;
	background: ${({ isInvisible }) => (isInvisible ? 'transparent' : 'white')};
	padding: 8px;
	z-index: 10;
`;
