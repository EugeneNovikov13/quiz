export const filterDataByIdSet = (data, idSet) => {
	return data.filter(item => idSet.has(item.id));
};
