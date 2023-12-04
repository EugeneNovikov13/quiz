export const updateObjectOfStates = (changedId, state, setState, newStateValue) => {
	const updatedState = Object.keys(state).reduce((acc, id) => {
		if (id !== changedId) return { ...acc, [id]: false };
		return { ...acc, [id]: newStateValue };
	}, {});

	setState(updatedState);
};
