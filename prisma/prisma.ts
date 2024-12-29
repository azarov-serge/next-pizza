import { pagination } from 'prisma-extension-pagination';
import { PrismaClient } from '@prisma/client';

declare const global: Global & { prisma?: PrismaClient };

export let prisma: PrismaClient;

if (typeof window === 'undefined') {
	if (process.env['NODE_ENV'] === 'production') {
		prisma = new PrismaClient({
			log: ['query'],
		}).$extends(pagination()) as unknown as PrismaClient;
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient();
		}
		prisma = global.prisma;
	}
}
