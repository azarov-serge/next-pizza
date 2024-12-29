'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AddressInput, FormTextarea, WhiteBlock } from '@/shared/components/shared';
import { ErrorText } from '../error-text';

type Props = {
	className?: string;
};

export const CheckoutDelivery: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title="3. Адрес доставки" className={className} contentClassName="p-8">
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error?.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					name="comment"
					className="text-base"
					placeholder="Комментарий к заказу"
					rows={5}
				/>
			</div>
		</WhiteBlock>
	);
};
