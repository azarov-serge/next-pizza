import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { prisma } from '@/prisma/prisma';
import { Ingredient, ProductItem } from '@prisma/client';
import { MAX_PRICE, MIN_PRICE, PizzaSize, pizzaSizes, PizzaType } from '../constants/pizza';
import { CartResponse } from '../services/dto/cart';
import { CartStateItem } from '../store/cart';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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

type Item = {
	productItem: ProductItem;
	ingredients: Ingredient[];
	quantity: number;
};

export const calcCartItemTotalAmount = (item: Item): number => {
	return (
		(item.productItem.price +
			item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) *
		item.quantity
	);
};

type ReturnProps = {
	items: CartStateItem[];
	totalAmount: number;
};

export const getCartDetails = (data: CartResponse): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalAmount(item),
		pizzaSize: item?.pizzaSize,
		type: item?.type,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return { items, totalAmount: data.totalAmount || 0 };
};

export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: { token },
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});

	const totalAmount = userCart?.items.reduce((acc, item) => {
		return acc + calcCartItemTotalAmount(item);
	}, 0);

	return await prisma.cart.update({
		where: { id: userCart?.id },
		data: { totalAmount },
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});
};

export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: { token },
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token,
			},
		});
	}

	return userCart;
};

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

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
