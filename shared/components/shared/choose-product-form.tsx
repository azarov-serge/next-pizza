'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
// import { useCart } from '@/hooks/use-cart';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui/button';
import { Title } from './title';

interface Props {
	loading: boolean;
	imageUrl: string;
	name: string;
	className?: string;
	items?: ProductWithRelations['items'];
	onClickAddCart: () => Promise<void>;
}

export const ChooseProductForm: React.FC<Props> = ({
	loading,
	name,
	items,
	imageUrl,
	onClickAddCart,
	className,
}) => {
	const productItem = items?.[0];

	if (!productItem) {
		throw new Error('Продукт не найден');
	}

	const productPrice = productItem.price;

	return (
		<div className={cn(className, 'flex flex-1')}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={imageUrl}
					alt={name}
					className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
				/>
			</div>

			<div className="w-[490px] bg-[#FCFCFC] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<Button
					loading={loading}
					onClick={onClickAddCart}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
				>
					Добавить в корзину за {productPrice} ₽
				</Button>
			</div>
		</div>
	);
};
