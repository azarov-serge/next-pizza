import React from 'react';
import { redirect } from 'next/navigation';
import { WhiteBlock } from '@/shared/components/shared';
import { cn } from '@/shared/lib';
import { CartStateItem } from '@/shared/store/cart';
import { CheckoutItem } from './checkout-item';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';

type Props = {
	loading: boolean;
	items: CartStateItem[] | null;
	className?: string;
};

export const CheckoutCart: React.FC<Props> = ({ loading, items, className }) => {
	if (items !== null && !items.length) {
		return redirect('/');
	}

	return (
		<WhiteBlock title="1. Корзина" className={className}>
			<div className="flex flex-col gap-5">
				{loading
					? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
					: items?.map((item) => {
							return <CheckoutItem key={item.id} {...item} />;
						})}
			</div>
		</WhiteBlock>
	);
};
