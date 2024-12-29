import React from 'react';
import { useSet } from 'react-use';
import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from '../lib/utils';

export const useChoosePizza = ({
	ingredients,
	items,
}: {
	ingredients: Ingredient[];
	items?: ProductItem[];
}) => {
	const [size, setSize] = React.useState<PizzaSize>(20);
	const [type, setType] = React.useState<PizzaType>(1);
	const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));

	const totalPrice = calcTotalPizzaPrice({
		ingredients,
		selectedIngredientsIds,
		items,
		type,
		size,
	});

	const textDetails = `${size}см, ${mapPizzaType[type].toLowerCase()} тесто`;
	const pizzaSizes = getAvailablePizzaSizes(type, items);
	const currentItemId = items?.find((item) => item.pizzaType === type && item.size === size)?.id;

	React.useEffect(() => {
		const isAvailableSize = pizzaSizes?.find(
			(item) => Number(item.value) === size && !item.disabled,
		);
		const availableSize = pizzaSizes?.find((item) => !item.disabled);

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	const setPizzaSize = (value: number | string) => {
		setSize(Number(value) as PizzaSize);
	};

	const setPizzaType = (value: number | string) => {
		setType(Number(value) as PizzaType);
	};

	const isSelectedIngredient = (id: number) => {
		return selectedIngredientsIds.has(id);
	};

	return {
		currentItemId,
		size,
		setPizzaSize,
		type,
		setPizzaType,
		isSelectedIngredient,
		toggleAddIngredient,
		totalPrice,
		textDetails,
		pizzaSizes,
		selectedIngredientsIds,
	};
};
