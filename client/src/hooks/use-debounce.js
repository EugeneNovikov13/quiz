export const useDebounce = (refs, func, delay) => {
	return function (...args) {
		clearTimeout(refs.current);
		refs.current = setTimeout(() => func.apply(this, args), delay);
	};
};
