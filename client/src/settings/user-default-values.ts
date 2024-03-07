import { IUser } from '../types';

export const userDefaultValues: Omit<IUser, 'id'> = {
	name: '',
	surname: '',
	email: '',
	image: '',
};
