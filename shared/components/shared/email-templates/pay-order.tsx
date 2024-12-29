import * as React from 'react';

type Props = {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
};

export const PayOrderTemplate: React.FC<Readonly<Props>> = ({
	orderId,
	totalAmount,
	paymentUrl,
}) => (
	<div>
		<h1>Заказ# {orderId}</h1>
		<p>
			Стоимость заказа {totalAmount} ₽.{' '}
			{paymentUrl ? (
				<>
					Перейдите{' '}
					<a href={paymentUrl} target="_blank">
						по этой ссылке
					</a>{' '}
					для оплаты заказа.{' '}
				</>
			) : (
				''
			)}
		</p>
	</div>
);
