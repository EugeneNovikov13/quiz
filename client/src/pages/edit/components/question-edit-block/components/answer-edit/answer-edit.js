import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import icons from '../../../../assets';
import { Icon } from '../../../../../../components';
import { SET_IS_EDITED } from '../../../../../../redux/actions';
import styled from 'styled-components';

const AnswerEditContainer = ({ className, answerText, isCorrect }) => {
	const answerTextRef = useRef(null);
	const dispatch = useDispatch();

	const onCheckedClick = () => {
		// dispatch() изменение состояния isCorrect в Redux
		dispatch(SET_IS_EDITED);
	};

	return (
		<div className={className}>
			<div
				ref={answerTextRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="answer-text"
			>
				{answerText}
			</div>
			<div className="answer-icons">
				<div className="checked">
					<Icon
						iconSrc={isCorrect ? icons.checkedMark : ''}
						width={'15px'}
						onClick={() => onCheckedClick(isCorrect)}
					/>
				</div>
				<Icon iconSrc={icons.trashBin} width={'15px'} />
			</div>
		</div>
	);
};

export const AnswerEdit = styled(AnswerEditContainer)`
	display: flex;
	gap: 5px;

	& .answer-text {
		width: 300px;
		min-height: 42px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px;
	}

	& .answer-text:focus {
		background-color: #fff;
	}

	& .answer-icons {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	& .checked {
		width: 15px;
		height: 15px;
		border: 1px solid #000;
		border-radius: 50%;
	}

	& .checked:hover {
		cursor: pointer;
	}
`;
