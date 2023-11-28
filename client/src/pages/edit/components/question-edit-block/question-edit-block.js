import { useState } from 'react';
import { Icon } from '../../../../components';
import icons from '../../assets';
import styled from 'styled-components';
import { AnswerEdit } from './components';

const QuestionEditContainer = ({ className, question, answers }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const onArrowClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className={className}>
			{isExpanded ? (
				<>
					<div className="ques-header">
						<input type="text" value={question} />
						<Icon
							iconSrc={icons.upArrow}
							width={'20px'}
							onClick={onArrowClick}
						/>
					</div>
					<div className="add-button">+</div>
					<div className="answers">
						{answers.map(({ id, text, isCorrect }) => (
							<AnswerEdit key={id} text={text} isCorrect={isCorrect} />
						))}
					</div>
				</>
			) : (
				<div className="ques-header" onClick={onArrowClick}>
					<div className="ques-title">{question}</div>
					<Icon iconSrc={icons.downArrow} width={'20px'} />
				</div>
			)}
		</div>
	);
};

export const QuestionEditBlock = styled(QuestionEditContainer)`
	display: flex;
	flex-direction: column;
	gap: 15px;
	border: 1px solid #ccc;
	border-radius: 10px;
	padding: 5px 15px;

	& input {
		width: 300px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px 10px;
		font-size: 15px;
		background-color: inherit;
		transition: width 0.5s ease-in;
	}

	& input:focus {
		width: 600px;
		background-color: #fff;
	}

	& .ques-header {
		display: flex;
		justify-content: space-between;
	}

	& .add-button {
		width: 300px;
		height: 30px;
		line-height: 26px;
		border: 1px solid #ccc;
		border-radius: 10px;
		text-align: center;
	}

	& .answers {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;
