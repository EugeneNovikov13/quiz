import styled from 'styled-components';

const EditInputContainer = ({ className, ...props }) => {
	return <input className={className} type="text" {...props} />;
};

export const EditInput = styled(EditInputContainer)`
	width: 400px;
	height: 50px;
	border: 1px solid #ccc;
	border-radius: 10px;
	padding: 5px 10px;
	font-size: 18px;
	background-color: inherit;
	transition: width 0.5s ease-in;

	&:focus {
		width: 600px;
		background-color: #fff;
		outline: 1px solid #000;
	}

	@media (max-width: 550px) {
		width: 300px;

		&:focus {
			width: 360px;
		}
	}
`;
