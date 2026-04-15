import { activeSupplier } from "@/services/Suppliers";

export const useShowSearchItems = () => {
    const fetchParts = async (query: string) => {
        try {
            const partsId = await activeSupplier.fetchParts(query);
            return partsId;
        } catch (error) {
            console.error("Error fetching parts:", error);
            throw error;
        }
    };
    const fetchPartDetails = async (partId: string) => {
        try {
            const partDetails = await activeSupplier.fetchPartDetails?.(partId);
            return partDetails;
        } catch (error) {
            console.error("Error fetching part details:", error);
            throw error;
        }
    };
    const addToCart = async (partId: string, quantity: number) => {
        try {
            await activeSupplier.addToCart?.(partId, quantity);
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw error;
        }
    };

    return { fetchParts, addToCart };
};