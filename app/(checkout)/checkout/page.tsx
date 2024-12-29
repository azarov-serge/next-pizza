import { Container, Title } from '@/shared/components/shared';
import { CheckoutForm } from '@/shared/components/shared';

export default async function CheckoutPage() {
	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" size="xl" className="font-extrabold mb-8" />
			<CheckoutForm />
		</Container>
	);
}
