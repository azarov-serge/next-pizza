import React from 'react';
import { useSet } from 'react-use';
import { useSearchParams } from 'next/navigation';

export interface PriseRange {
	priceFrom?: number;
	priceTo?: number;
}

export interface Filters {
	prices: PriseRange;
	ingredients: Set<string>;
	pizzaTypes: Set<string>;
	sizes: Set<string>;
}

interface ReturnProps extends Filters {
	setPrices: React.Dispatch<React.SetStateAction<PriseRange>>;
	toggleIngredients: (key: string) => void;
	togglePizzaTypes: (key: string) => void;
	toggleSizes: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams();

	const [ingredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(
			searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : [],
		),
	);

	const [prices, setPrices] = React.useState<PriseRange>({
		priceFrom: searchParams.get('priceFrom')
			? Number(searchParams.get('priceFrom'))
			: undefined,
		priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined,
	});

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
		),
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []),
	);

	return React.useMemo(
		() => ({
			prices,
			ingredients,
			pizzaTypes,
			sizes,
			setPrices,
			toggleIngredients,
			togglePizzaTypes,
			toggleSizes,
		}),
		[sizes, pizzaTypes, ingredients, prices],
	);
};
