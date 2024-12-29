'use client';

import React from 'react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';

export const SearchInput = () => {
	const [focused, setFocused] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [products, setProducts] = React.useState<Product[]>([]);
	const ref = React.useRef(null);

	useClickAway(ref, () => {
		setFocused(false);
	});

	useDebounce(
		async () => {
			if (!searchQuery) {
				setProducts([]);
				return;
			}

			try {
				const products = await Api.products.search(searchQuery);
				setProducts(products);
			} catch (error) {
				console.error(error);
			}
		},
		100,
		[searchQuery],
	);

	const onClickItem = () => {
		setProducts([]);
		setSearchQuery('');
		setFocused(false);
	};

	return (
		<>
			{focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11',
					focused && 'z-30',
				)}
			>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

				<input
					className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
					type="text"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12',
						)}
					>
						{products.map((product) => (
							<Link
								href={`/product/${product.id}`}
								key={product.id}
								className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
								onClick={onClickItem}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									width={32}
									height={32}
									alt={product.name}
									src={product.imageUrl}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
