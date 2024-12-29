'use client';

// import { Category } from '@prisma/client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';

interface Props {
	// items: Category[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items?: any[];
	className?: string;
}

const categories = [
	{ id: 1, name: 'Пиццы' },
	{ id: 2, name: 'Завтраки' },
];

export const Categories: React.FC<Props> = ({ items = categories, className }) => {
	const activeId = useCategoryStore((state) => state.activeId);
	const setActiveId = useCategoryStore((state) => state.setActiveId);

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
			{items.map(({ id, name }) => (
				<a
					key={id}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
					)}
					href={`/#${name}`}
					onClick={() => setActiveId(id)}
				>
					{name}
				</a>
			))}
		</div>
	);
};
