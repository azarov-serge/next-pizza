'use client';

import React from 'react';
import { useIntersection } from 'react-use';
import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { ProductCard } from './product-card';
import { Title } from './title';

interface Props {
	title: string;
	products: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
	categoryName: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	products,
	listClassName,
	categoryId,
	className,
}) => {
	const setActiveId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveId(categoryId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [intersection?.isIntersecting]);

	return (
		<div className={className} id={title}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div ref={intersectionRef} className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{products
					.filter((product) => product.items.length > 0)
					.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							imageUrl={product.imageUrl}
							price={product.items[0].price}
							ingredients={product.ingredients}
						/>
					))}
			</div>
		</div>
	);
};
