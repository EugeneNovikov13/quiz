import { IResult } from '../types';

type StateType = {
	[id: string]: boolean;
};

export const updateObjectOfStates = (
	changedId: IResult['id'],
	state: StateType,
	newStateValue: boolean,
) => {
	return Object.keys(state).reduce((acc, id) => {
		if (id !== changedId) return { ...acc, [id]: false };
		return { ...acc, [id]: newStateValue };
	}, {});
};
