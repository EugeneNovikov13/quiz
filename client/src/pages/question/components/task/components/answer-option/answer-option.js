import styled from 'styled-components';
import { useState } from 'react';

const AnswerOptionContainer = ({ className, id, text }) => {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div className={className}>
			<input
				type="checkbox"
				id={`selected-answer-${id}`}
				name="selected-answer"
				checked={isSelected}
				onChange={() => setIsSelected(!isSelected)}
			/>
			<div className="custom-check-icon"></div>
			<label htmlFor={`selected-answer-${id}`} className="answer-text">
				{text}
			</label>
		</div>
	);
};

export const AnswerOption = styled(AnswerOptionContainer)`
	display: flex;
	gap: 10px;
	align-items: center;
	position: relative;

	& .custom-check-icon {
		position: relative;
		width: 15px;
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
		width: 300px;
		margin-top: -2px;
		user-select: none;
	}
`;
