import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/shared/components/shared';

export const metadata: Metadata = {
	title: 'Next Pizza',
	description: 'Вкуснее уже некуда',
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body>
				<main className="min-h-screen">
					<Suspense>
						<Header />
					</Suspense>
					{children}
					{modal}
				</main>
			</body>
		</html>
	);
}
