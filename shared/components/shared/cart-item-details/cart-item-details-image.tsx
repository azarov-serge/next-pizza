import { cn } from '@/shared/lib/utils';

interface Props {
	src: string;
	className?: string;
	alt: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className, alt }) => {
	// eslint-disable-next-line @next/next/no-img-element
	return <img className={cn('w-[60px] h-[60px]', className)} src={src} alt={alt} />;
};
