import styled from 'styled-components';
import { FC, ReactNode } from 'react';
import { TooltipPositionType } from '../../constants';

interface TooltipProps {
	className?: string;
	children: ReactNode;
	tooltipPosition: TooltipPositionType;
	isHovered?: boolean;
	isInvisible?: boolean;
}

const TooltipContainer: FC<TooltipProps> = ({ className, children }) => {
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
