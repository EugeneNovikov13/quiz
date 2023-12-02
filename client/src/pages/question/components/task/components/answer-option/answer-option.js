import styled from 'styled-components';

const AnswerOptionContainer = ({ className, id, text }) => {
	return (
		<div className={className}>
			<div className="checkbox"></div>
			<div className="answer-text">{text}</div>
		</div>
	);
};

export const AnswerOption = styled(AnswerOptionContainer)`
	display: flex;
	gap: 10px;
	align-items: center;

	& .checkbox {
		width: 15px;
		height: 15px;
		border: 1px solid #000;
		border-radius: 50%;
	}

	& .answer-text {
		width: 300px;
	}
`;
