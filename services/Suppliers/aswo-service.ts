import { PartsSupplier } from './types';

export const aswoSupplier: PartsSupplier = {
    fetchParts: async (query: string) => {
    const key = process.env.EXPO_PUBLIC_ASWO_KEY;
    const response = await fetch(`https://aswoshop.aswo.com/service/customerapi/devicesearch?devicesearchterms=${query}&format=FFFF?key=${key}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    return await response.json();
},
};