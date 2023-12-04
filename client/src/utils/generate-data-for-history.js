export const generateDataForHistory = data => ({
	id: Date.now().toString(),
	createdDate: new Date().toLocaleDateString(),
	createdTime: new Date().toLocaleTimeString(),
	testResult: data,
});
