import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';

interface Props {
	className?: string;
	contentClassName?: string;
	title?: string;
	// вставить в конец любой JSX
	endAdornment?: React.ReactNode;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
	title,
	endAdornment,
	className,
	contentClassName,
	children,
}) => {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<div className="flex items-center justify-between p-5 px-7">
					<Title text={title} size="sm" className="font-bold" />
					{endAdornment}
				</div>
			)}

			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	);
};