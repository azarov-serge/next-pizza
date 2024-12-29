import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Ingredient } from '@prisma/client';
import { Title } from './title';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl?: string;
	ingredients?: Ingredient[];
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	return (
		<div className={cn(className)}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					{/* eslint-disable-next-line @next/next/no-img-element*/}
					<img className="w-[215px] h-[215px]" src={imageUrl ?? ''} alt="Logo" />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

				{Boolean(ingredients?.length) && (
					<p className="text-sm text-gray-400">
						{ingredients?.map(({ name }) => name).join(', ')}
					</p>
				)}

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{price} ₽</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
};
