import { APIRequestContext, expect, request } from "@playwright/test"
import { Headers } from "../../utils/headers"
export class ApiReferalPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }
    
    async setReferal (url: string, userToken: string, userId: string, referralUserId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "userId": `${referralUserId}`,
            "referringUserId": `${userId}`
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/referal/user/set`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        expect(referralUserId).toEqual(response._id)
        console.log(`User ${userId} add new refferal with id ${referralUserId} `)   
    }

    async getReferalUsers(url: string, userToken: string, referralUserId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/referal/users`, {headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const returnedUserId = response[0]._id
        expect(referralUserId).toEqual(returnedUserId)
        console.log(`User with ${returnedUserId} is displayed`) 
    }

    async getReferalRulsList(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/referal/rules/list`, {headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`The Rules List is displayed`)  
    }

    async getReferralUsersStatistics (url: string, userToken: string, period: "day" | "week" | "month") {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "period": `${period}`
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/referal/users/statistics`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`The Statistics for the ${period} period is displayed.`)
    }
    

}