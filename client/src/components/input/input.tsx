import React, { FC, forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label: string;
	error?: string;
	props: unknown[];
}

const InputContainer: FC<InputProps> = forwardRef(
	(
		{ className, label, error, ...props },
		ref: React.ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<div className={className}>
				<span className="label">{label}</span>
				<input className="input" {...props} ref={ref} />
				<span className="error">{error}</span>
			</div>
		);
	},
);

export const Input = styled(InputContainer)`
	display: flex;
	flex-direction: column;
	gap: 5px;
	max-width: 360px;
	margin-bottom: 10px;

	& .label {
		font-size: 14px;
	}

	& .input {
		width: 360px;
		height: 34px;
		padding: 10px;
		font-size: 18px;
		border: ${({ error }) => (error ? '1px solid red' : '1px solid #ccc')};
		border-radius: 8px;
	}

	@media (max-width: 440px) {
		.input {
			width: 320px;
		}
	}

	& .input:focus {
		border: none;
		outline: 2px solid #ccc;
	}

	& .error {
		color: red;
		font-size: 12px;
	}
`;
