import React from 'react';
import { CreateCartItemValues } from '../services/dto/cart';
import { CartStateItem, useCartStore } from '../store/cart';

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[] | null;
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (runFetch?: boolean): ReturnProps => {
	const cartState = useCartStore((state) => state);

	React.useEffect(() => {
		if (runFetch) {
			cartState.fetchCartItems();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return cartState;
};
