import { Link } from 'react-router-dom';
import { Button, NavBar } from '../../components';
import styled from 'styled-components';

const EditContainer = ({ className }) => {
	return (
		<div className={className}>
			<NavBar bgColorbrightness={false} readyToComplete={true}>
				<Link to="/">
					<Button onClick={() => console.log('Назад')}>Назад</Button>
				</Link>
				<Link to="/edit">
					<Button
						className="right-button"
						onClick={() => console.log('Сохранить')}
					>
						Сохранить
					</Button>
				</Link>
			</NavBar>
		</div>
	);
};

export const Edit = styled(EditContainer)``;
