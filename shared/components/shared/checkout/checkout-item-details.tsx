'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WhiteBlock } from '@/shared/components/shared';
import { Button, Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

type Props = {
	title: React.ReactNode;
	value: React.ReactNode;
	className?: string;
};

export const CheckoutItemDetails: React.FC<Props> = ({ title, value, className }) => {
	return (
		<div className={cn('flex my-4', className)}>
			<span className="flex flex-1 text-lg text-neutral-500">
				{title}
				<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
			</span>

			<span className="font-bold text-lg">{value}</span>
		</div>
	);
};
