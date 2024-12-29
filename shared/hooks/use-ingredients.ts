import React from 'react';
import { Api } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';

interface ReturnProps {
	loading: boolean;
	ingredients: Ingredient[];
}

export const useIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const data = await Api.ingredients.getAll();

				setIngredients(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchIngredients();
	}, []);

	return { loading, ingredients };
};
