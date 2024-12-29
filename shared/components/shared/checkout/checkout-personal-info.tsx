import React from 'react';
import { FormInput, WhiteBlock } from '@/shared/components/shared';

type Props = {
	className?: string;
};

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональная информация" className={className} contentClassName="p-8">
			<div className="grid grid-cols-2 gap-5">
				<FormInput name="firstName" className="text-base" placeholder="Имя" />
				<FormInput name="lastName" className="text-base" placeholder="Фамилия" />
				<FormInput name="email" className="text-base" placeholder="E-Mail" />
				{/** react imask package */}
				<FormInput name="phone" className="text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	);
};
