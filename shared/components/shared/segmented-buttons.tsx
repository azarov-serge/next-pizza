'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

type SegmentedButton = {
	name: string;
	value: string;
	disabled?: boolean;
};

interface Props {
	items: readonly SegmentedButton[];
	defaultValue?: string;
	className?: string;
	value?: SegmentedButton['value'];
	onClick?: (value: SegmentedButton['value']) => void;
}

export const SegmentedButtons: React.FC<Props> = ({ items, onClick, className, value }) => {
	return (
		<div
			className={cn(
				className,
				'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
			)}
		>
			{items.map((item) => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						},
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
