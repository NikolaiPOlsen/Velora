import { PartsSupplier } from './types';

export const aswoSupplier: PartsSupplier = {
    fetchParts: async (query: string) => {
        const key = process.env.EXPO_PUBLIC_ASWO_KEY;
        const response = await fetch(`https://aswoshop.aswo.com/service/customerapi/articlesearch?articlesearchkeywords=${query}&format=json&apikey=${key}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        const text = await response.text();
        console.log("ASWO fetchParts:", text);
        const data = JSON.parse(text);
        return Object.values(data);
},
    fetchPartDetails: async (partId: string) => {
        const key = process.env.EXPO_PUBLIC_ASWO_KEY;
        const response = await fetch(`https://aswoshop.aswo.com/service/customerapi/articledata?artnr=${partId}&format=json&apikey=${key}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        return response.json();
    },
    addToCart: async (partId: string, quantity: number) => {
        const key = process.env.EXPO_PUBLIC_ASWO_KEY;
        const response = await fetch(`https://aswoshop.aswo.com/service/customerapi/shoppingbasketput?artnr=${partId}&quantity=${quantity}&format=json&apikey=${key}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        });
        const text = await response.text();
        console.log("ASWO Add to Cart Response:", text);
        const result = JSON.parse(text);
        if (!result || !result.success) {
            throw new Error(result?.message || "Failed to add item to cart");
        }
    }
};