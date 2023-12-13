import { request } from './index';

export const loadTestsAsync = (id, limit, page) =>
	request(`/tests?user=${id}&limit=${limit}&page=${page}`);
