import { useState } from 'react';
import { correctAnswerCounting } from '../../../../../../utils';
import { AnswerResult } from './components';
import { Tooltip } from '../../../../../../components';
import styled from 'styled-components';

const TestResultContainer = ({ className, testDate, testTime, results }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const answersQuantity = results.length;
	const correctAnswersQuantity = correctAnswerCounting(results);

	const onMouseEnter = event => {
		setIsHovered(true);
		setMousePosition({ x: event.clientX, y: event.clientY });
	};

	return (
		<div className={className}>
			<div className="date-block">
				<div className="date">{testDate}</div>
				<div className="time">{testTime}</div>
			</div>
			<div className="test-process-line">
				<Tooltip
					isHovered={isHovered}
					mousePosition={mousePosition}
				>{`Пройдено: ${correctAnswersQuantity} из ${answersQuantity}`}</Tooltip>
				<div>0</div>
				<div
					className="process-visualisation"
					onMouseEnter={e => onMouseEnter(e)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{results.map(({ id, isCorrect }) => (
						<AnswerResult
							className="answer"
							key={id}
							isCorrect={isCorrect}
							width={200 / answersQuantity}
						/>
					))}
				</div>
				<div>{results.length}</div>
			</div>
			<div className="final-result">{`Верно: ${correctAnswersQuantity} из ${answersQuantity}`}</div>
		</div>
	);
};

export const TestResult = styled(TestResultContainer)`
	display: flex;
	border: 1px solid #000;
	border-radius: 10px;
	padding: 10px;
	align-items: center;
	background-color: #fff;

	& .date-block {
		width: 250px;
	}

	& .time {
		font-size: 11px;
	}

	& .test-process-line {
		width: 250px;
		display: flex;
		gap: 5px;
	}

	& .process-visualisation {
		display: flex;
		width: 200px;
		height: 20px;
		border: 1px solid black;
		border-radius: 10px;
		overflow: hidden;
	}

	& .final-result {
		width: 240px;
		text-align: right;
	}
`;
