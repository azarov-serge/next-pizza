import { prisma } from '@/prisma/prisma';
import { Ingredient, ProductItem } from '@prisma/client';
import { MAX_PRICE, MIN_PRICE, PizzaSize, pizzaSizes, PizzaType } from '../constants/pizza';
import { GetSearchParams } from './card-utils';

export const calcTotalPizzaPrice = ({
	ingredients,
	items,
	selectedIngredientsIds,
	type,
	size,
}: {
	ingredients: Ingredient[];
	items?: ProductItem[];
	selectedIngredientsIds: Set<number>;
	type: PizzaType;
	size: PizzaSize;
}): number => {
	const totalIngredientPrice: number =
		ingredients
			?.filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
			?.reduce((acc, item) => acc + item.price, 0) || 0;

	const pizzaPrice: number =
		items?.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
	return totalIngredientPrice + pizzaPrice;
};

export const getAvailablePizzaSizes = (type: PizzaType, items?: ProductItem[]) => {
	const filteredPizzasByType = items
		?.filter((item) => item.pizzaType === type)
		.map((item) => item.size);

	return pizzaSizes.map<{
		name: string;
		value: string;
		disabled?: boolean;
	}>((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType?.some((activeSize) => activeSize === Number(item.value)),
	}));
};

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(',').map(Number);
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
	const ingredientsIds = params.ingredients?.split(',').map(Number);

	const minPrice = Number(params.priceFrom) || MIN_PRICE;
	const maxPrice = Number(params.priceTo) || MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIds
						? { some: { id: { in: ingredientsIds } } }
						: undefined,
					items: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	});

	return categories;
};
