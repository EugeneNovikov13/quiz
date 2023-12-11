import { useEffect } from 'react';

export const useResetForm = (reset, wasLogin) => {
	useEffect(() => {
		if (wasLogin) {
			reset();
		}
	}, [reset, wasLogin]);
};
