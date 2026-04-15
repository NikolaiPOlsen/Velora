import { PartsSupplier } from './types';
import { OperationResult } from './types';

export const mobilepartsSupplier: PartsSupplier = {
    fetchParts: async (query: string) => {
        const key = process.env.EXPO_PUBLIC_MOBILEPARTS_KEY;
        const response = await fetch(`https://services.2service.nl/dealers/parts/search?SearchText=${query}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    },
    authenticate: async () => {
        const key = process.env.EXPO_PUBLIC_MOBILEPARTS_KEY;
        const response = await fetch(`https://services.2service.nl/dealers/authenticate?UserName=${process.env.EXPO_PUBLIC_MOBILEPARTS_UNAME}&Password=${process.env.EXPO_PUBLIC_MOBILEPARTS_PASS}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        });

        const result: OperationResult = await response.json();
        if (!result.IsSuccessful) {
            throw new Error(result.ErrorMessage);
        }
        return await response.json();
    }
};