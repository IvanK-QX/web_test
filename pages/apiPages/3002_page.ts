import { APIRequestContext, expect, request } from '@playwright/test'
import { Headers } from '../../utils/headers'

export class Api3002Page {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async getAgoraTokenForChannel(url: string, userToken: string, streamerId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            streamId: `${streamerId}`,
            whatchYourStream: false,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3002/getAgoraTokenForChannel`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        const responseJson = await apiRequest.json()
        expect(response).toContain('token')
        expect(responseJson.isStreamer).toEqual(true)
        console.log(`getAgoraTokenForChannel is received`)
    }

    async getAgoraTokenForModerator(url: string, adminToken: string, streamerId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            streamIds: [`${streamerId}`],
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3002/moderator/getAgoraTokenForChannel`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('token')
        console.log(`getAgoraTokenForModerator is received`)
    }

    async getAgoraListofTokenForModerator(url: string, adminToken: string, streamerId: string, streamerId2: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            streamIds: [`${streamerId}`, `${streamerId2}`],
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3002/moderator/getAgoraTokenForChannel`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        expect(response[0].streamId).toContain(streamerId)
        expect(response[1].streamId).toContain(streamerId2)
        console.log(`List Of Tokens For Moderator is received`)
    }
}
