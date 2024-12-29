'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { useCart } from '@/shared/hooks';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
	product: ProductWithRelations;
	onSuccess?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSuccess }) => {
	const isPizzaForm = Boolean(product?.items[0]?.pizzaType);
	const { loading, addCartItem } = useCart();

	const onAddPizza = async ({
		productItemId,
		ingredientsIds,
		productName,
	}: {
		productItemId: number;
		ingredientsIds: number[];
		productName: string;
	}) => {
		try {
			await addCartItem({ productItemId, ingredientsIds });
			onSuccess?.();
			toast.success(`Товар "${productName}" добавлен в корзину`);
		} catch (error) {
			console.error(error);
			toast.error('Произошла ошибка при добавлении в корзину');
		}
	};

	const onAddProduct = async () => {
		try {
			addCartItem({ productItemId: product.items[0].id });
			onSuccess?.();
			toast.success(`Товар "${product.name}" добавлен в корзину`);
		} catch (error) {
			console.error(error);
			toast.error('Произошла ошибка при добавлении в корзину');
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				loading={loading}
				imageUrl={product.imageUrl}
				name={product.name}
				items={product.items}
				onClickAddCart={onAddPizza}
				ingredients={product.ingredients}
			/>
		);
	}

	return (
		<ChooseProductForm
			loading={loading}
			imageUrl={product.imageUrl}
			name={product.name}
			items={product.items}
			onClickAddCart={onAddProduct}
		/>
	);
};
