export const updateItemInLocalStorage = (itemKey, newData) => {
	let updatedData;

	const data = JSON.parse(localStorage.getItem(itemKey));

	if (data) {
		updatedData = [...data, newData];
	} else {
		updatedData = [newData];
	}

	localStorage.setItem(itemKey, JSON.stringify(updatedData));
};
