'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	className?: string;
	selected: Set<string>;
	loading?: boolean;
	name?: string;
	onClickCheckbox?: (value: string) => void;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	selected,
	onClickCheckbox,
	loading,
	name,
}) => {
	const [showAll, setShowAll] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const filteredItems = items.filter((item) =>
		item.text.toLowerCase().includes(searchValue.toLowerCase()),
	);

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>

				{...Array(limit)
					.fill('skeleton')
					.map((item, index) => (
						<Skeleton key={`${item}-${index}`} className="mb-4 h-6 rounded-[8px]" />
					))}

				<Skeleton className="w-28 mb-4 h-6 rounded-[8px]" />
			</div>
		);
	}

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{(showAll ? filteredItems : defaultItems || filteredItems).map((item) => (
					<FilterCheckbox
						key={String(item.value)}
						checked={selected?.has(item.value)}
						value={item.value}
						text={item.text}
						endAdornment={item.endAdornment}
						name={name}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
