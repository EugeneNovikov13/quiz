import { useEffect } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';

export const useResetForm = <T extends FieldValues>(
	reset: UseFormReset<T>,
	wasLogin: boolean,
) => {
	useEffect(() => {
		if (wasLogin) {
			reset();
		}
	}, [reset, wasLogin]);
};
