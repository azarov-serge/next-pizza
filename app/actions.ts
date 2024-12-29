'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/prisma/prisma';
import { PayOrderTemplate } from '@/shared/components/shared';
import { sendEmail } from '@/shared/lib';
import { FormOrderValues } from '@/shared/schemas/order-form-schema';
import { OrderStatus } from '@prisma/client';

export async function createOrder(data: FormOrderValues) {
	const cookiesStore = cookies();

	try {
		const { firstName, lastName, phone, email, address, comment } = data;
		const token = cookiesStore.get('cartToken')?.value;

		if (!token) {
			throw Error('Cart token not found');
		}

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token,
			},
		});

		if (!userCart) {
			throw Error('User cart not found');
		}

		if (userCart.totalAmount === 0) {
			throw Error('Cart is empty');
		}

		const order = await prisma.order.create({
			data: {
				token,
				fullName: `${lastName} ${firstName}`,
				email,
				phone,
				address,
				comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		// // Сделано без оплаты
		// // в app/api/cart/callback сделать route.ts
		// // написать POST запрос, который будет принимать статус от платежной системы

		// const paymentData = await createPayment({
		// 	orderId: order.id,
		// 	amount: order.totalAmount,
		// 	description: `Заказ #${order.id}`,
		// });

		// const paymentUrl = paymentData.confirmation.confirmation_url;

		// if (!paymentData) {
		// 	throw Error('Payment error');
		// }

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: new Date().toISOString(),
				// TDOD: удалить при реальном заказе
				status: OrderStatus.SUCCEEDED,
				// paymentId: paymentData.id,
			},
		});

		sendEmail(
			data.email,
			`Next Pizza / оплатите заказ#${order.id}`,
			PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl: '' }),
		);

		return { url: undefined, orderId: order.id };
	} catch (error) {
		console.log('++++', error);
	} finally {
		cookiesStore.delete('cartToken');
	}
}
