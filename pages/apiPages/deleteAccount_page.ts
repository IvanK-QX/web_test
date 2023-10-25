import { APIRequestContext, expect, request } from "@playwright/test"

export class ApiDeleteAccountPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async deleteAccount(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            reason: "iDon'tLikeThisApp"
        }
        const headers = {
            'authorization': `Bearer ${userToken}`,
            'packagename': 'com.plamfy',
            'content-type': 'application/json',
            'appversion': '1',
            'os': 'browser'
        }
        const apiRequest = await apiContext.post(`${url}:3000/delete`, {data, headers: headers})
        const response = await apiRequest.json()
        expect(apiRequest.ok()).toBeTruthy()
        expect(response.success).toEqual(true)
        console.log(`User Deleted`)
    }

}