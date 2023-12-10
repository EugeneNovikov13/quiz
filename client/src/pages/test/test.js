import { History } from './components';
import { Button, TestInfo } from '../../components';
import styled from 'styled-components';

const TestContainer = ({ className }) => {
	// const [test, setTest] = useState([]);
	//
	// const params = useParams();
	//
	// useEffect(() => {
	// 	request(`/tests/${params.id}`).then(({ data }) => {
	// 		setTest(data);
	// 	});
	// }, [params.id]);

	return (
		<div className={className}>
			<TestInfo />
			<Button>Запустить тест</Button>
			<History />
		</div>
	);
};

export const Test = styled(TestContainer)``;
