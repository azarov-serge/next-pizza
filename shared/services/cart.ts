// import { Cart } from '@prisma/client';
import { CartResponse, CreateCartItemValues } from './dto/cart';
import { axiosInstance } from './instance';

// type AddCartItemResponseDTO = { success: boolean; cart: Cart };

export const fetchCart = async (): Promise<CartResponse> => {
	const { data } = await axiosInstance.get<CartResponse>('/cart');

	return data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartResponse> => {
	const { data } = await axiosInstance.post<CartResponse>('/cart', values);

	return data;
};

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartResponse> => {
	const { data } = await axiosInstance.patch<CartResponse>('/cart/' + id, { quantity });

	return data;
};

export const removeCartItem = async (id: number): Promise<CartResponse> => {
	const { data } = await axiosInstance.delete<CartResponse>('/cart/' + id);

	return data;
};
