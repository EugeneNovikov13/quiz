import { Tooltip } from '../../../../../../../../components';
import styled from 'styled-components';

const AnswerResultContainer = ({
	className,
	answer,
	question,
	isCorrect,
	isHovered,
	tooltipPosition,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<div
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Tooltip isHovered={isHovered} tooltipPosition={{ x: -20, y: 10 }}>
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
`;
