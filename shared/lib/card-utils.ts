import { prisma } from '@/prisma/prisma';
import { Ingredient, ProductItem } from '@prisma/client';
import { CartResponse } from '../services/dto/cart';
import { CartStateItem } from '../store/cart';

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
