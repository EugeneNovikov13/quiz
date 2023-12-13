import { request } from './index';

export const deleteTestAsync = id => request(`/tests/${id}`, 'DELETE');
