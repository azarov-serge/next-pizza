import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/prisma/prisma';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart';

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

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
		return NextResponse.json({ message: '[CART_GET] Server error' }, { status: 500 });
	}
}

const createIdsString = (items?: number[]): string => {
	if (!items?.length) {
		return '';
	}

	return items.sort((a, b) => a - b).join(';');
};

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);
		const data = (await req.json()) as CreateCartItemValues;
		const findCartItems = await prisma.cartItem.findMany({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
			},
			include: {
				ingredients: true,
			},
		});

		const productItemIds = createIdsString(data.ingredientsIds);

		const findCartItem = findCartItems.find((item) => {
			const itemIds = createIdsString(item.ingredients?.map((ingredient) => ingredient.id));

			return productItemIds === itemIds;
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: { connect: data.ingredientsIds?.map((id) => ({ id })) },
				},
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);

		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set('cartToken', token);
		return resp;
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 });
	}
}

// export async function DELETE(req: NextRequest) {
// 	try {
// 		const cartToken = req.cookies.get('cartToken')?.value;
// 		const currentUser = await getUserSession();
// 		const userId = Number(currentUser?.id);

// 		if (!cartToken) {
// 			return NextResponse.json({ message: 'Cart token not found' }, { status: 400 });
// 		}

// 		const userCart = await prisma.cart.findFirst({
// 			where: {
// 				OR: [
// 					{
// 						userId,
// 					},
// 					{
// 						tokenId: cartToken,
// 					},
// 				],
// 			},
// 		});

// 		if (!userCart) {
// 			return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
// 		}

// 		await prisma.cartItem.deleteMany({
// 			where: {
// 				cartId: userCart.id,
// 			},
// 		});

// 		const totalAmount = await getCartTotalAmount(userCart.id);
// 		const updatedCart = await updateCartTotalAmount(userCart.id, totalAmount);

// 		return NextResponse.json(updatedCart);
// 	} catch (err) {
// 		console.log(err);
// 		return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
// 	}
// }
