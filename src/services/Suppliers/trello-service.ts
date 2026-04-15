export const createTrelloCard = async ({ idList, name, desc }: { idList: string, name: string, desc: string }) => {
    const key = process.env.EXPO_PUBLIC_TRELLO_KEY;
    const token = process.env.EXPO_PUBLIC_TRELLO_TOKEN;
    
    const response = await fetch(`https://api.trello.com/1/cards?idList=${idList}&name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `OAuth oauth_consumer_key="${key}", oauth_token="${token}"`
        },
        body: JSON.stringify({ idList: idList, name: name, desc: desc })
    }
);

return await response.json();
};