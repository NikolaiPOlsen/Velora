import { PartsSupplier } from './types';

const mobilepartsSupplier: PartsSupplier = {
    fetchParts: async (query: string) => {
        const key = process.env.EXPO_PUBLIC_MOBILEPARTS_KEY;
        const response = await fetch(`https://api.mobileparts.com/v1/search?query=${query}&key=${key}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    }
};