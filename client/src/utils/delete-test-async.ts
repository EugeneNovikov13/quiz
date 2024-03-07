import { request } from './index';
import { ITest } from '../types';

export const deleteTestAsync = (id: ITest['id']) => {
	return request<null>(`/tests/${id}`, 'DELETE');
};
