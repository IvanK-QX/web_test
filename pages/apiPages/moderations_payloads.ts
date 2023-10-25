export class ModerationsPayloads {

    static actionsOnOtherUser(userId: string){
        const query =  {
            "streamerId": `${userId}`,
            "itemsPerPage": 100
        }
        return query
    
    }

    static getUpdatedUsersList(moderatorHumanReadableId: number, humanReadableId: number ){
        const query =  {
            "itemsPerPage": 100,
            "skip": 0,
            "moderatorHumanReadableId": `${moderatorHumanReadableId}`,
            "userHumanReadableId": `${humanReadableId}`
        }
        return query
    
    }

}