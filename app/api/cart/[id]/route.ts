import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { updateCartTotalAmount } from '@/shared/lib/utils';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' });
		}

		const data = (await req.json()) as { quantity: number };

		await prisma.cartItem.update({
			where: {
				id: cartItem.id,
			},
			data: {
				quantity: data.quantity,
			},
		});

		await updateCartTotalAmount(token);

		const userCart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: '[CART_PATCH] Server error' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' });
		}

		await prisma.cartItem.delete({
			where: {
				id: cartItem.id,
			},
		});

		await updateCartTotalAmount(token);

		const userCart = await prisma.cart.findFirst({
			where: { token },
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
	}
}
