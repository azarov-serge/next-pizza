import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma';
import { ChooseProductModal } from '@/shared/components/shared';

export default async function PhotoModalPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}