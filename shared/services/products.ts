import { Product } from '@prisma/client';
import { ApiRoute } from './constants';
import { axiosInstance } from './instance';

export const search = async (query: string) => {
	const { data } = await axiosInstance.get<Product[]>(ApiRoute.SEARCH_PRODUCT, {
		params: { query },
	});

	return data;
};
