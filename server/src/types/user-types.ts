export interface IUser {
	name: string,
	surname: string,
	email: string,
	password: string,
	image?: string,
}

export interface IMappedUser extends Omit<IUser, 'password'> {
	id: string
	image: string
}
