import { Tooltip } from '../../../../../../../../components';
import { TOOLTIP_POSITION } from '../../../../../../../../constants';
import styled from 'styled-components';
import { FC } from 'react';

interface AnswerResultProps {
	className?: string;
	answer: string;
	question: string;
	isCorrect: boolean;
	answersQuantity: number;
	isHovered: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

const AnswerResultContainer: FC<AnswerResultProps> = ({
	className,
	answer,
	question,
	isCorrect,
	answersQuantity,
	isHovered,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<div
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Tooltip isHovered={isHovered} tooltipPosition={TOOLTIP_POSITION.HISTORY}>
				<div className="question-result">
					<div>{`Вопрос: ${question}`}</div>
					<div>{`Ваш ответ: ${answer}`}</div>
					<div>{`Верно: ${isCorrect ? 'Да' : 'Нет'}`}</div>
				</div>
			</Tooltip>
		</div>
	);
};

export const AnswerResult = styled(AnswerResultContainer)`
	position: relative;
	width: ${({ answersQuantity }) => 100 / answersQuantity}%;
	height: 100%;
	background-color: ${({ isCorrect }) => (isCorrect ? 'lightgreen' : 'darkred')};
	border-right: 1px dotted #fff;

	&:first-child {
		border-radius: 10px 0 0 10px;
	}

	&:last-child {
		border-radius: 0 10px 10px 0;
		border-right: none;
	}

	& .question-result {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 250px;
		font-size: 14px;
	}
`;
