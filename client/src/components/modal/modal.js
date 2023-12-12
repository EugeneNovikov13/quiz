import { useSelector } from 'react-redux';
import {
	selectModalIsError,
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../redux/selectors';
import { Button } from '../button/button';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isError = useSelector(selectModalIsError);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				{isError ? (
					<div className="buttons">
						<Button width="120px" onClick={onCancel}>
							OK
						</Button>
					</div>
				) : (
					<div className="buttons">
						<Button width="120px" onClick={onConfirm}>
							Да
						</Button>
						<Button width="120px" onClick={onCancel}>
							Отмена
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 20;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		width: 400px;
		margin: 0 auto;
		padding: 0 20px 20px;
		text-align: center;
		background-color: #fff;
		border: 2px solid #000;
		z-index: 30;
	}

	& .buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
	}
`;
