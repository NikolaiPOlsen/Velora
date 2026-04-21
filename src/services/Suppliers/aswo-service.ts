import { supabase } from '@/src/utils/supabase';
import { PartsSupplier } from '../../../supabase/functions/fetch-parts/types';

export const aswoSupplier: PartsSupplier = {
    fetchParts: async (query: string) => {
        const { data, error } = await supabase.functions.invoke('fetch-parts', {
            body: { action: 'fetchParts', query },
        });
        if (error) throw error;
        return data;
    },
    fetchPartDetails: async (partId: string) => {
        const { data, error } = await supabase.functions.invoke('fetch-parts', {
            body: { action: 'fetchPartDetails', partId },
        });
        if (error) throw error;
        return data;
    },
    addToCart: async (partId: string, quantity: number) => {
        const { data, error } = await supabase.functions.invoke('fetch-parts', {
            body: { action: 'addToCart', partId, quantity },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
    },
};
