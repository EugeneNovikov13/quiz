import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../../utils';
import { History } from './components';
import { Button, TestInfo } from '../../components';
import styled from 'styled-components';

const TestContainer = ({ className }) => {
	//TODO переделать на диспатч в редьюсер
	const [test, setTest] = useState({
		id: '',
		title: '',
		createdAt: '',
		author: { name: '', surname: '' },
		questions: [],
	});

	// const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

	const params = useParams();

	useEffect(() => {
		request(`/tests/${params.id}`).then(({ data }) => {
			setTest(data);
		});
	}, [params.id]);

	return (
		<div className={className}>
			<TestInfo
				title={test.title}
				createdAt={test.createdAt}
				author={test.author.surname + ' ' + test.author.name}
				questionsCount={test.questions.length}
			/>
			<Button>Запустить тест</Button>
			<History />
		</div>
	);
};

export const Test = styled(TestContainer)``;
