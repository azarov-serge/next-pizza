import React from 'react';
import { CircleCheck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
}

export const Ingredient: React.FC<Props> = ({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick,
}) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
				{ 'border border-primary': active },
				className,
			)}
		>
			{active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img width={110} height={110} src={imageUrl} alt={name} />
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold">{price} ₽</span>
		</div>
	);
};
