import { APIRequestContext, expect, request } from '@playwright/test'
import { Headers } from '../../utils/headers'

export class ApiInternalPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async getBotRules(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/profile/getBotRule`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const userId = response._id
        console.log(`Bot Rule For user ${userId} is displayed`)
    }

    async slackBotNotifications(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/testSlackBotNotification`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('error')
        console.log(`Slackbot notification is displayed`)
    }

    async getStreamsShiftModerator(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/getStreamsShiftModerator`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`StreamsShiftModerator is displayed`)
    }

    async getProfile(url: string, userToken: string, userId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/profile`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const id = response._id
        expect(id).toEqual(userId)
        console.log(`User profile ${id} is displayed`)
    }

    async stremerType(url: string, adminToken: string, userId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            userId: `${userId}`,
            type: 'Official',
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/streamer/type`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const status = response.streamerType
        expect(status).toEqual('Official')
        console.log(`For user ${userId} set status ${status}`)
    }

    async analyticsRevcat(url: string, adminToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            additionalProp1: {},
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/analitics/revcat`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`analyticsRevcat is dispalyed`)
    }

    async webhooksRevcat(url: string, adminToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            additionalProp1: {},
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/webhooks/revcat`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`webhooksRevcat is dispalyed`)
    }
}
