import React from 'react';

type RefType = React.MutableRefObject<NodeJS.Timeout | undefined>;

export const useDebounce = <T extends unknown[]>(
	refs: RefType,
	func: (...args: T) => void,
	delay: number,
) => {
	return function (...args: T) {
		clearTimeout(refs.current);
		refs.current = setTimeout(() => func(...args), delay);
	};
};
