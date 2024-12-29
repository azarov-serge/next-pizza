import { create } from 'zustand';
import { getCartDetails } from '../lib/utils';
import { Api } from '../services/api-client';
import { CreateCartItemValues } from '../services/dto/cart';

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	type?: number | null;
	disabled?: boolean;
	ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];
	fetchCartItems: () => Promise<void>;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,
	removeCartItem: async (id: number) => {
		try {
			set((state) => ({
				loading: true,
				error: false,
				items: state.items.map((item) =>
					item.id === id ? { ...item, disabled: true } : item,
				),
			}));
			const data = await Api.cart.removeCartItem(id);
			set(getCartDetails(data));
		} catch (error) {
			set({ error: true });
			console.error(error);
		} finally {
			set((state) => ({
				loading: false,
				items: state.items.map((item) =>
					item.id === id ? { ...item, disabled: false } : item,
				),
			}));
		}
	},
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.fetchCart();
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.addCartItem(values);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
}));
