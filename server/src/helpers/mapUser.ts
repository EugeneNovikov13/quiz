import { IMappedUser, IUser } from '../types';
import { HydratedDocument } from 'mongoose';

export default (user: HydratedDocument<IUser>): IMappedUser => ({
		id: user.id,
		email: user.email,
		name: user.name,
		surname: user.surname,
		image: user.image ?? '',
})
