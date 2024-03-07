import { request } from './index';
import { ITest, ITestList } from '../types';

export const loadTestsAsync = (id: ITest['id'], limit: number, page: number) =>
	request<ITestList>(`/tests?user=${id}&limit=${limit}&page=${page}`);
