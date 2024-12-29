import { ArrowRight } from 'lucide-react';
import {
	CheckoutItem,
	Container,
	FormInput,
	FormTextarea,
	Title,
	WhiteBlock,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

export default async function CheckoutPage() {
	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" size="xl" className="font-extrabold mb-8" />

			<div className="flex gap-10">
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина">
						<div className="flex flex-col gap-5">
							<CheckoutItem
								name="Pizza#1"
								type={1}
								pizzaSize={40}
								ingredients={[]}
								price={300}
								imageUrl="https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
								quantity={1}
							/>
							<CheckoutItem
								name="Pizza#1"
								type={1}
								pizzaSize={40}
								ingredients={[]}
								price={300}
								imageUrl="https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
								quantity={1}
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock
						title="2. Персональная информация"
						// className={!totalAmount ? 'opacity-50 pointer-events-none' : ''}
						contentClassName="p-8"
					>
						<div className="grid grid-cols-2 gap-5">
							{/* <FormInput name="firstName" className="text-base" placeholder="Имя" />
		<FormInput name="lastName" className="text-base" placeholder="Фамилия" />
		<FormInput name="email" className="text-base" placeholder="E-Mail" />
		<FormInput name="phone" className="text-base" placeholder="Телефон" /> */}
						</div>
					</WhiteBlock>

					<WhiteBlock
						// className={!totalAmount ? 'opacity-50 pointer-events-none' : ''}
						title="3. Адрес доставки"
						contentClassName="p-8"
					>
						<div className="flex flex-col gap-5">
							{/* <Controller
                    control={form.control}
                    name="address"
                    render={({ field }) => <AdressInput onChange={field.onChange} />}
                  /> */}

							{/* <FormTextarea
								name="comment"
								className="text-base"
								placeholder="Комментарий к заказу"
								rows={5}
							/> */}
						</div>
					</WhiteBlock>
				</div>
				<div className="w-[450px]">
					<WhiteBlock className={cn('p-6 sticky top-4')}>
						<div className="flex flex-col gap-1">
							<span className="text-xl">Итого:</span>
							<span className="text-4xl font-extrabold">{0} ₽</span>
						</div>

						<div className="flex my-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Стоимость товаров:
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>

							<span className="font-bold text-lg">{0} ₽</span>
						</div>

						<div className="flex my-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Налог:
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>

							<span className="font-bold text-lg">{0} ₽</span>
						</div>

						<div className="flex my-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Доставка:
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>

							<span className="font-bold text-lg">{0} ₽</span>
						</div>

						<Button
							type="submit"
							// disabled={!totalAmount || submitting}
							className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
						>
							Перейти к оплате
							<ArrowRight className="w-5 ml-2" />
						</Button>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
