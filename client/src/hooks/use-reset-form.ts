import { useEffect } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';

export const useResetForm = (reset: UseFormReset<FieldValues>, wasLogin: boolean) => {
	useEffect(() => {
		if (wasLogin) {
			reset();
		}
	}, [reset, wasLogin]);
};
