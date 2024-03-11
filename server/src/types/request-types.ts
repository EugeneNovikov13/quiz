export interface ITestRequestQuery {
	user: string;
	limit: string;
	page: string;
}

export interface IUserPatchBody {
	name?: string,
	surname?: string,
	email?: string,
	image?: string,
}
