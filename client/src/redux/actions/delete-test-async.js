import { request } from '../../utils';

export const deleteTestAsync = id => request(`/tests/${id}`, 'DELETE');
