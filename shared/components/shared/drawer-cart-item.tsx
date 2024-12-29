'use client';

import React from 'react';
import { Trash2Icon } from 'lucide-react';
import debounce from 'lodash.debounce';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import * as CartItemDetails from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';

interface Props extends CartItemProps {
	id: number;
	ingredients?: Array<{ name: string; price: number }>;
	pizzaSize?: number | null;
	type?: number | null;
	disabled?: boolean;
}

export const DrawerCartItem: React.FC<Props> = ({
	id,
	imageUrl,
	name,
	price,
	ingredients,
	pizzaSize,
	type,
	quantity,
	disabled,
	className,
}) => {
	const removeCartItem = useCartStore((state) => state.removeCartItem);
	const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

	const onClickCountButton = debounce((type: 'plus' | 'minus') => {
		updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1);
	}, 200);

	return (
		<div
			className={cn(
				'flex bg-white p-5 gap-6',
				{ 'opacity-50 pointer-events-none': disabled },
				className,
			)}
		>
			<CartItemDetails.Image src={imageUrl} alt={name} />

			<div className="flex-1">
				<CartItemDetails.Info
					name={name}
					ingredients={ingredients}
					pizzaSize={pizzaSize}
					type={type}
				/>

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton onClick={onClickCountButton} value={quantity} />

					<div className="flex items-center gap-3">
						<CartItemDetails.Price value={price} />
						<Trash2Icon
							onClick={() => removeCartItem(id)}
							className="text-gray-400 cursor-pointer hover:text-gray-600"
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
