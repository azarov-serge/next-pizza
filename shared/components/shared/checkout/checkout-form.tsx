'use client';

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createOrder } from '@/app/actions';
import { useCart } from '@/shared/hooks';
import { orderFormSchema, FormOrderValues } from '@/shared/schemas/order-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutCart } from './checkout-cart';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutPersonalInfo } from './checkout-personal-info';
import { CheckoutSidebar } from './checkout-sidebar';

export const CheckoutForm = () => {
	const { loading, items, totalAmount } = useCart(true);
	const [submitting, setSubmitting] = React.useState(false);
	const [orderId, setOrderId] = React.useState<number>();

	const form = useForm<FormOrderValues>({
		resolver: zodResolver(orderFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit: SubmitHandler<FormOrderValues> = async (data) => {
		try {
			setSubmitting(true);

			const {
				// url,
				orderId,
			} = (await createOrder(data)) ?? {};

			toast.error(`Заказ${orderId ? `#${orderId}` : ''} успешно оформлен! 📝`, {
				icon: '✅',
			});

			// if (url) {
			// location.href = url;
			// }

			if (orderId) {
				setOrderId(orderId);
			}
		} catch (error) {
			return toast.error('Неверный E-Mail или пароль', {
				icon: '❌',
			});
		} finally {
			setSubmitting(false);
		}
	};

	if (orderId) {
		return (
			<>
				<p>Заказ#{orderId} успешно оформлен</p>
				<p>
					Проверьте письмо на почте {form.getValues('email')}, оно могло попасть в папку
					"Спам"
				</p>
			</>
		);
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex gap-10">
					<div className="flex flex-col gap-10 flex-1 mb-20">
						<CheckoutCart
							loading={!totalAmount && loading && !items?.length}
							items={items}
							className={submitting ? 'opacity-50 pointer-events-none' : ''}
						/>
						<CheckoutPersonalInfo
							className={
								!totalAmount || submitting ? 'opacity-50 pointer-events-none' : ''
							}
						/>
						<CheckoutDelivery
							className={
								!totalAmount || submitting ? 'opacity-50 pointer-events-none' : ''
							}
						/>
					</div>
					<div className="w-[450px]">
						<CheckoutSidebar
							loading={loading}
							totalAmount={totalAmount}
							disabled={!totalAmount || loading || submitting}
						/>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
