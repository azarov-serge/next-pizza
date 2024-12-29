import React from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import qs from 'qs';
import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();

	const updateQueryParams = React.useMemo(
		() =>
			debounce((params) => {
				router.push(
					`?${qs.stringify(params, {
						arrayFormat: 'comma',
					})}`,
					{ scroll: false },
				);
			}, 300),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	React.useEffect(() => {
		const { prices, ingredients, sizes, pizzaTypes } = filters;
		updateQueryParams({
			...prices,
			ingredients: Array.from(ingredients),
			sizes: Array.from(sizes),
			pizzaTypes: Array.from(pizzaTypes),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);
};
