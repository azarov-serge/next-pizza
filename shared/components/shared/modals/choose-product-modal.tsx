'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib';
import { ProductForm } from '../product-form';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	const onCloseModal = router.back;

	return (
		<Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}
			>
				<ProductForm product={product} onSuccess={onCloseModal} />
			</DialogContent>
		</Dialog>
	);
};
