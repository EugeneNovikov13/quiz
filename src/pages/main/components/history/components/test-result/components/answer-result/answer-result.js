import styled from 'styled-components';

const AnswerResultContainer = ({ className }) => {
	return <div className={className}></div>;
};

export const AnswerResult = styled(AnswerResultContainer)`
	width: ${({ width }) => width}px;
	height: 100%;
	background-color: ${({ res }) => (res ? 'lightgreen' : 'darkred')};
`;
