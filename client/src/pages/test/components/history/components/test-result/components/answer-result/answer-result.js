import { Tooltip } from '../../../../../../../../components';
import { TOOLTIP_POSITION } from '../../../../../../../../constants';
import styled from 'styled-components';

const AnswerResultContainer = ({
	className,
	answer,
	question,
	isCorrect,
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
				<div className="question">{`Вопрос: ${question}`}</div>
				<div className="answer">{`Ваш ответ: ${answer}`}</div>
				<div className="is-correct">{`Верно: ${isCorrect ? 'Да' : 'Нет'}`}</div>
			</Tooltip>
		</div>
	);
};

export const AnswerResult = styled(AnswerResultContainer)`
	position: relative;
	width: ${({ width }) => width}px;
	height: 100%;
	background-color: ${({ isCorrect }) => (isCorrect ? 'lightgreen' : 'darkred')};
	border-right: 1px dotted #fff;

	&:first-child {
		border-radius: 10px 0 0 10px;
	}

	&:last-child {
		border-radius: 0 10px 10px 0;
	}
`;
