import styled from 'styled-components';

const PageNumberContainer = ({ className, number, onClick }) => {
	return (
		<div className={className} onClick={onClick}>
			<div>{number}</div>
		</div>
	);
};

export const PageNumber = styled(PageNumberContainer)`
	width: 30px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
	background-color: ${({ isActive }) => (isActive ? '#000' : '#fff')};

	&:first-child {
		border-radius: 6px 0 0 6px;
	}

	&:last-child {
		border-radius: 0 6px 6px 0;
	}

	&:not(:last-child) {
		border-right: 2px solid #000;
	}

	&:hover {
		cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
	}

	& div {
		width: 20px;
		text-align: center;
		transition: 0.3s;
	}

	& div:hover {
		transform: ${({ isActive }) => (isActive ? 'none' : 'scale(1.4)')};
	}
`;
