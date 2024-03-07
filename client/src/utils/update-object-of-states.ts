import { IResult } from '../types';

export type ResultItemsHoveredType = {
	[id: string]: boolean;
};

export const updateObjectOfStates = (
	changedId: IResult['id'],
	state: ResultItemsHoveredType,
	newStateValue: boolean,
) => {
	return Object.keys(state).reduce((acc, id) => {
		if (id !== changedId) return { ...acc, [id]: false };
		return { ...acc, [id]: newStateValue };
	}, {});
};
