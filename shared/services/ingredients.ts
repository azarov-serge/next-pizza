import { Ingredient } from '@prisma/client';
import { ApiRoute } from './constants';
import { axiosInstance } from './instance';

export const getAll = async () => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoute.INGREDIENTS);

	return data;
};
