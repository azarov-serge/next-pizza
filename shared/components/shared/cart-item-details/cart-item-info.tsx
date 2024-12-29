import { mapPizzaSize, mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
	name: string;
	pizzaSize?: number | null;
	type?: number | null;
	ingredients?: Array<{ name: string; price: number }>;
}

export const CartItemInfo: React.FC<Props> = ({ name, pizzaSize, type, ingredients }) => {
	const details = [];

	if (pizzaSize && type) {
		const typeName = mapPizzaType[Number(type) as PizzaType]
			? mapPizzaType[Number(type) as PizzaType] + ' тесто'
			: '';

		const sizeName = mapPizzaSize[Number(pizzaSize) as PizzaSize]
			? mapPizzaSize[Number(pizzaSize) as PizzaSize] + ' '
			: '';

		details.push(`${sizeName}${pizzaSize} см, ${typeName} `);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
			</div>
			<p className="text-xs text-gray-400">{details.join(', ')}</p>
		</div>
	);
};
