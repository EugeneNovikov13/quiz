import styled from 'styled-components';

const AnswerOptionContainer = ({ className, id, text, checked, handleRadioChange }) => {
	return (
		<div className={className}>
			<input
				type="radio"
				id={id}
				name="selected-answer"
				value={text}
				checked={checked}
				onChange={handleRadioChange}
			/>
			<div className="custom-check-icon"></div>
			<label htmlFor={id} className="answer-text">
				{text}
			</label>
		</div>
	);
};

export const AnswerOption = styled(AnswerOptionContainer)`
	width: 330px;
	display: flex;
	gap: 10px;
	position: relative;

	& .custom-check-icon {
		position: relative;
		top: 2px;
		min-width: 15px;
		height: 15px;
		border: 1px solid #000;
		border-radius: 50%;
		background-color: #fff;
	}

	& input:hover ~ .custom-check-icon {
		border: 2px solid lightgreen;
	}

	& input:checked ~ .custom-check-icon {
		background-color: lightgreen;
	}

	& input {
		width: 15px;
		height: 15px;
		position: absolute;
		left: -4px;
		z-index: 1;
		opacity: 0;
	}

	& .answer-text {
		margin-top: -2px;
		user-select: none;
	}
`;
