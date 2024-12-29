'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { pizzaTypes } from '@/shared/constants/pizza';
import { useChoosePizza } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import { Button } from '../ui/button';
import { Ingredient } from './ingredient';
import { PizzaImage } from './pizza-image';
import { SegmentedButtons } from './segmented-buttons';
import { Title } from './title';

interface Props {
	loading: boolean;
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: ProductWithRelations['ingredients'];
	items?: ProductWithRelations['items'];

	onClickAddCart: (args: {
		productItemId: number;
		ingredientsIds: number[];
		productName: string;
	}) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	loading,
	name,
	items,
	imageUrl,
	ingredients,
	onClickAddCart,
	className,
}) => {
	const {
		currentItemId,
		size,
		setPizzaSize,
		type,
		setPizzaType,
		isSelectedIngredient,
		toggleAddIngredient,
		totalPrice,
		textDetails,
		pizzaSizes,
		selectedIngredientsIds,
	} = useChoosePizza({ ingredients, items });

	const handleClickAddCard = async () => {
		if (!currentItemId) {
			return;
		}

		await onClickAddCart({
			productItemId: currentItemId,
			ingredientsIds: Array.from(selectedIngredientsIds),
			productName: name,
		});
	};

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#FCFCFC] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetails}</p>

				<div className="flex flex-col gap-3 mt-5 mb-8">
					<SegmentedButtons
						items={pizzaSizes}
						value={String(size)}
						onClick={setPizzaSize}
					/>
					<SegmentedButtons
						items={pizzaTypes}
						value={String(type)}
						onClick={setPizzaType}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
					<div className={cn('grid grid-cols-3 gap-3', className)}>
						{ingredients.map((item) => (
							<Ingredient
								key={item.id}
								active={isSelectedIngredient(item.id)}
								name={item.name}
								imageUrl={item.imageUrl}
								price={item.price}
								onClick={() => toggleAddIngredient(item.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAddCard}
					className="h-[55px] px-10 text-base rounded-[18px] w-full"
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
