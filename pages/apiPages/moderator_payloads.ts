export class ModetarorPayloads {

    static createNewModerator(email: string){
        const query = {
            "authProvider": "ownEmail",
            "role": "admin",
            "email": `${email}`,
            "password": "password"
        }
        return query
    
    }

    static moderatorLogin(guestUserToken: string, email, deviceId: string){
        const query = {
            "authProvider": "ownEmail",
            "email": `${email}`,
            "password": "password",
            "guestUserToken": `${guestUserToken}`,
            "deviceId": `${deviceId}`,
            "language": "uk",
            "version": 1  
        }
        return query
    }

    static adminProfileUpdate(userId: string, action: string, userName: string, payoneerEmail: string ){
        const query = {
            "userId": `${userId}`,
            "action": `${action}`,
            "updateFields": {
              "name": `${userName}`,
              "status": "Active",
              "payoutEmail": `${payoneerEmail}`,
              "defaultPaymentMethod": "payoneerEmail"
            }
        }
        return query
    }

    static adminModeratorAction(streamId: string, type: string, reason: string){
        const query = {
            "type": `${type}`,
            "streamIds": [
                `${streamId}`
            ],
            "reason": `${reason}`
        }
        return query
    }

    static getAdminActionList(streamId: string){
        const query = {
            "type": "warning",
            "streamIds": [
                `${streamId}`
            ],
            "skip": 0,
            "itemsPerPage": 10
        }
        return query
    }
    


}