import React, { FC } from 'react';
import styled from 'styled-components';

interface IconProps {
	className?: string;
	iconSrc: string;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
	width?: string;
	isDisable?: boolean;
}

const IconContainer: FC<IconProps> = ({
	className,
	iconSrc,
	onClick,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<img
			className={className}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			src={iconSrc}
			alt=""
		/>
	);
};

export const Icon = styled(IconContainer)`
	width: ${({ width }) => width};
	vertical-align: top;

	&:hover {
		cursor: ${({ isDisable }) => (isDisable ? 'default' : 'pointer')};
	}
`;
