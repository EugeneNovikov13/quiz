import { IAuthUser, IUserDocument } from '../types';

export default (user: IUserDocument): IAuthUser => {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		surname: user.surname,
		image: user.image ?? '',
	}
}
