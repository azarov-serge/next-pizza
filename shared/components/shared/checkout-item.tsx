'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import * as CartItemDetails from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButtonProps } from './count-button';

interface Props extends CartItemProps {
	pizzaSize?: number | null;
	type?: number | null;
	ingredients?: Array<{ name: string; price: number }>;
	onClickRemove?: () => void;
	onClickCountButton?: CountButtonProps['onClick'];
	className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	type,
	pizzaSize,
	ingredients,
	price,
	imageUrl,
	quantity,
	className,
	onClickCountButton,
	onClickRemove,
}) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
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
				<button onClick={onClickRemove}>
					{/* <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} /> */}
				</button>
			</div>
		</div>
	);
};
