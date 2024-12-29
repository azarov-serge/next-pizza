'use client';

import React from 'react';
import { X } from 'lucide-react';
import debounce from 'lodash.debounce';
import { useCart } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import * as CartItemDetails from '../cart-item-details';
import { CartItemProps } from '../cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
	id: number;
	pizzaSize?: number | null;
	type?: number | null;
	ingredients?: Array<{ name: string; price: number }>;
	className?: string;
	disabled?: boolean;
}

export const CheckoutItem: React.FC<Props> = ({
	id,
	name,
	type,
	pizzaSize,
	ingredients,
	price,
	imageUrl,
	quantity,
	className,
	disabled,
}) => {
	const { removeCartItem, updateItemQuantity } = useCart();

	const onClickCountButton = debounce((type: 'plus' | 'minus') => {
		updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1);
	}, 200);

	return (
		<div
			className={cn(
				'flex items-center justify-between',
				{ 'opacity-50 pointer-events-none': disabled },
				className,
			)}
		>
			<div className="flex items-center gap-5 flex-1">
				<CartItemDetails.Image src={imageUrl} alt={name} />
				<CartItemDetails.Info
					name={name}
					type={type}
					pizzaSize={pizzaSize}
					ingredients={ingredients}
				/>
			</div>

			<CartItemDetails.Price value={price} />

			<div className="flex items-center gap-5 ml-20">
				<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
				<button type="button" onClick={() => removeCartItem(id)}>
					<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
				</button>
			</div>
		</div>
	);
};
