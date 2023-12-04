import { Tooltip } from '../../../../../../../../components';
import styled from 'styled-components';

const AnswerResultContainer = ({
	className,
	answer,
	question,
	isCorrect,
	isHovered,
	mousePosition,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<div
			className={className}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Tooltip isHovered={isHovered} mousePosition={mousePosition}>
				<div className="question">{`Вопрос: ${question}`}</div>
				<div className="answer">{`Ваш ответ: ${answer}`}</div>
				<div className="is-correct">{`Верно: ${isCorrect ? 'Да' : 'Нет'}`}</div>
			</Tooltip>
		</div>
	);
};

export const AnswerResult = styled(AnswerResultContainer)`
	width: ${({ width }) => width}px;
	height: 100%;
	background-color: ${({ isCorrect }) => (isCorrect ? 'lightgreen' : 'darkred')};
	border-right: 1px dotted #fff;
`;
