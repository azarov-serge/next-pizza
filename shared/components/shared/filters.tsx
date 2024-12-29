'use client';

import React from 'react';
import { CheckboxFiltersGroup } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui';
import { MAX_PRICE, MIN_PRICE } from '@/shared/constants/pizza';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';
import { RangeSlider } from '../ui/range-slider';
import { Title } from './title';

interface Props {
	className?: string;
}

const pizzaTypeFilters = [
	{ text: 'Тонкое', value: '1' },
	{ text: 'Традиционное', value: '2' },
];

const sizeFilters = [
	{ text: '20 см', value: '20' },
	{ text: '30 см', value: '30' },
	{ text: '40 см', value: '40' },
];

export const Filters: React.FC<Props> = ({ className }) => {
	const { loading: ingredientsLoading, ingredients: ingredientsList } = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const ingredientItems = ingredientsList.map((item) => ({
		text: item.name,
		value: item.id.toString(),
	}));

	return (
		<div className={className}>
			<Title
				text="Фильтрация"
				size="sm"
				className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
			/>

			<CheckboxFiltersGroup
				name="pizzaTypes"
				className="mb-5"
				title="Тип теста"
				selected={filters.pizzaTypes}
				items={pizzaTypeFilters}
				onClickCheckbox={filters.togglePizzaTypes}
			/>

			<CheckboxFiltersGroup
				name="sizes"
				className="mb-5"
				title="Размеры"
				selected={filters.sizes}
				items={sizeFilters}
				onClickCheckbox={filters.toggleSizes}
			/>

			<div className="mt-10 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder={`${MIN_PRICE}`}
						min={MIN_PRICE}
						max={MAX_PRICE}
						value={filters.prices.priceFrom}
						onChange={(evt) => {
							const priceFrom = Number(evt.target.value ?? MIN_PRICE);

							filters.setPrices((price) => ({
								...price,
								priceFrom,
							}));
						}}
					/>
					<Input
						type="number"
						min={100}
						max={MAX_PRICE}
						placeholder={`${MAX_PRICE}`}
						value={filters.prices.priceTo}
						onChange={(evt) => {
							const priceTo = Number(evt.target.value ?? MAX_PRICE);

							filters.setPrices((price) => ({
								...price,
								priceTo,
							}));
						}}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || MIN_PRICE,
						filters.prices.priceTo || MAX_PRICE,
					]}
					onValueChange={([priceFrom, priceTo]) => {
						filters.setPrices({ priceFrom, priceTo });
					}}
				/>
			</div>

			<CheckboxFiltersGroup
				name="ingredients"
				loading={ingredientsLoading || ingredientsList.length === 0}
				className="mt-5"
				title="Ингредиенты"
				limit={6}
				selected={filters.ingredients}
				onClickCheckbox={filters.toggleIngredients}
				defaultItems={ingredientItems.slice(0, 6)}
				items={ingredientItems}
			/>
		</div>
	);
};
