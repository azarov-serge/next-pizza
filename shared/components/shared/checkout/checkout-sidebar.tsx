'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WhiteBlock } from '@/shared/components/shared';
import { Button, Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { CheckoutItemDetails } from './checkout-item-details';

const TAX = 15;
const DELIVERY_PRICE = 250;

type Props = {
	loading: boolean;
	totalAmount: number;
	disabled: boolean;
	className?: string;
};

export const CheckoutSidebar: React.FC<Props> = ({ loading, totalAmount, disabled, className }) => {
	const taxPrice = (totalAmount * TAX) / 100;
	const totalPrice = totalAmount + DELIVERY_PRICE + taxPrice;

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				{loading ? (
					<Skeleton className="h-11 w-48" />
				) : (
					<span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
				)}
			</div>

			<CheckoutItemDetails
				title={'Стоимость товаров:'}
				value={
					loading ? <Skeleton className="h-6 w-16 rounded-[6px" /> : `${totalAmount} ₽`
				}
			/>

			<CheckoutItemDetails
				title={'Налог:'}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px" /> : `${taxPrice} ₽`}
			/>

			<CheckoutItemDetails
				title={'Доставка:'}
				value={
					loading ? <Skeleton className="h-6 w-16 rounded-[6px" /> : `${DELIVERY_PRICE} ₽`
				}
			/>

			<Button
				type="submit"
				disabled={disabled}
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
