export const createArrayFromNumber = (num: number): Array<number> => {
	let arr = [];
	for (let i = 1; i <= num; i++) {
		arr.push(i);
	}
	return arr;
};
