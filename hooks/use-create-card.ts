import { createTrelloCard } from '@/services/Suppliers/trello-service';

export const useCreateCard = () => {
    const handleCreateCard = async (
        listId: string,
        customername: string,
        phonenumber: string,
        problem: string,
        pris: string
    ) => {
        try {
            const newCard = await createTrelloCard({
                name: `${customername} - ${phonenumber}`,
                desc: `Problem: ${problem}\nPris: ${pris}\n Dato: ${new Date().toLocaleDateString()}`,
                idList: listId,
            });
            console.log('Card created:', newCard);
            return true;
        } catch (error) {
            console.error('Feil ved opprettelse av kort:', error);
            return false;
        }
    };

    return { handleCreateCard };
};