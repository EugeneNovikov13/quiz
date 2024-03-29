import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	fontSize?: string;
	width?: string;
	height?: string;
	activeColor?: string;
	maxWidth?: string;
	isDisable?: boolean;
	children?: ReactNode;
	link?: string;
}

const ButtonContainer: FC<ButtonProps> = ({
	className,
	children,
	link,
	type = 'button',
	isDisable = false,
	onClick,
}) => {
	return (
		<>
			{link ? (
				//кнопка обёрнута ссылкой, принимающей адрес через пропсы
				<Link to={link}>
					<button
						className={className}
						type={type}
						disabled={isDisable}
						onClick={onClick}
					>
						{children}
					</button>
				</Link>
			) : (
				<button
					className={className}
					type={type}
					disabled={isDisable}
					onClick={onClick}
				>
					{children}
				</button>
			)}
		</>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '24px')};
	width: ${({ width }) => (width ? width : '350px')};
	height: ${({ height }) => (height ? height : '50px')};
	border-radius: 8px;
	border: none;
	color: ${({ activeColor }) => (activeColor ? '#fff' : '#000')};
	background-color: ${({ activeColor, isDisable }) =>
		!isDisable ? activeColor : '#ccc'};

	&:hover {
		cursor: ${({ isDisable }) => (isDisable ? '' : 'pointer')};
		filter: ${({ isDisable }) => (!isDisable ? 'brightness(0.9)' : '')};
		box-shadow: ${({ isDisable }) =>
			isDisable ? '' : '0 4px 2px -1px rgba(188, 188, 188, 1)'};
	}

	@media (max-width: 480px) {
		max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
	}
`;
