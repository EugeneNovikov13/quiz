import { FC, useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../../../../../hooks';
import {
	countNumberCorrectAnswers,
	ResultItemsHoveredType,
	updateObjectOfStates,
} from '../../../../../../utils';
import { AnswerResult } from './components';
import { STRIPE_LENGTH } from '../../../../../../constants';
import styled from 'styled-components';
import { IResult } from '../../../../../../types';

interface TestResultProps {
	className?: string;
	user: string;
	testDate: string;
	testTime: string;
	testResult: IResult[];
}

type MouseEventHandlerArgs = [string, { [id: string]: boolean }, boolean];

const TestResultContainer: FC<TestResultProps> = ({
	className,
	user,
	testDate,
	testTime,
	testResult,
}) => {
	const [isHovered, setIsHovered] = useState<ResultItemsHoveredType>({});
	let refs = useRef<NodeJS.Timeout>();

	useEffect(() => {
		const isHoveredInitialState = testResult.reduce(
			(acc, result) => ({ ...acc, [result.id]: false }),
			{},
		);
		setIsHovered(isHoveredInitialState);
	}, [testResult]);

	const answersQuantity = testResult.length;
	const rightAnswersCountString = countNumberCorrectAnswers(testResult, ' из ');

	const onMouseEnter = (...args: MouseEventHandlerArgs) => {
		const updatedState = updateObjectOfStates(...args);
		setIsHovered(updatedState);
	};

	const debouncedOnMouseEnter = useDebounce<MouseEventHandlerArgs>(
		refs,
		onMouseEnter,
		200,
	);

	const onMouseLeave = (...args: MouseEventHandlerArgs) => {
		const updatedState = updateObjectOfStates(...args);
		setIsHovered(updatedState);
		clearTimeout(refs.current);
	};

	return (
		<div className={className}>
			<div className="date-block">
				<div className="user">{user}</div>
				<div className="date">{testDate}</div>
				<div className="time">{testTime}</div>
			</div>
			<div className="test-process-line">
				<div>0</div>
				<div className="process-visualisation">
					{testResult.map(({ id, userAnswer, question, result }) => (
						<AnswerResult
							key={id}
							answer={userAnswer}
							question={question}
							isCorrect={result}
							answersQuantity={answersQuantity}
							isHovered={isHovered[id]}
							onMouseEnter={() =>
								debouncedOnMouseEnter(id, isHovered, true)
							}
							onMouseLeave={() => onMouseLeave(id, isHovered, false)}
						/>
					))}
				</div>
				<div>{testResult.length}</div>
			</div>
			<div className="final-result">{`Верно: ${rightAnswersCountString}`}</div>
		</div>
	);
};

export const TestResult = styled(TestResultContainer)`
	display: flex;
	justify-content: space-between;
	border: 1px solid #000;
	border-radius: 10px;
	padding: 5px 10px;
	align-items: center;
	background-color: #fff;

	& .date-block {
		width: 250px;
		line-height: 15px;
	}

	& .time {
		font-size: 11px;
	}

	& .test-process-line {
		width: ${STRIPE_LENGTH.wide + 50}px;
		display: flex;
		gap: 5px;
	}

	& .process-visualisation {
		display: flex;
		width: ${STRIPE_LENGTH.wide}px;
		height: 20px;
		border: 1px solid black;
		border-radius: 10px;
	}

	& .final-result {
		width: 240px;
		text-align: right;
	}

	@media (max-width: 600px) {
		align-items: flex-start;
		flex-direction: column;
		gap: 5px;

		& .process-visualisation {
			width: ${STRIPE_LENGTH.narrow}px;
		}

		& .test-process-line {
			width: ${STRIPE_LENGTH.narrow + 20}px;
		}

		& .final-result {
			text-align: left;
		}
	}
`;
