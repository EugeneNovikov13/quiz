export const getItemFromLocalStorage = itemKey => {
	return JSON.parse(localStorage.getItem(itemKey));
};
