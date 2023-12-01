import styled from 'styled-components';

const IconContainer = ({ className, iconSrc, onClick }) => {
	return <img className={className} onClick={onClick} src={iconSrc} alt="" />;
};

export const Icon = styled(IconContainer)`
	width: ${({ width }) => width};
	vertical-align: top;

	&:hover {
		cursor: pointer;
	}
`;
