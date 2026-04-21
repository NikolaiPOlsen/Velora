import { supabase } from '@/src/utils/supabase';

export const createTrelloCard = async ({ idList, name, desc }: { idList: string; name: string; desc: string }) => {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Session token preview:', session?.access_token?.substring(0, 30));
    const { data, error } = await supabase.functions.invoke('create-trello-card', {
        body: { idList, name, desc },
    });
    if (error) {
        console.error('Supabase function error:', JSON.stringify(error));
        throw error;
    }
    if (data?.error) throw new Error(data.error);
    return data;
};
