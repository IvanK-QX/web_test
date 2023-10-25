import { APIRequestContext, expect, request } from "@playwright/test"
import { Headers } from "../../utils/headers"
export class ApiGiftsPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async getGifts(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/gifts/list`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const giftList = await apiRequest.text()
        const giftIdOne = response[0]._id
        const giftIdTwo = response[1]._id
        console.log(`List of gists is dispalyed`)
        return { giftIdOne, giftIdTwo, giftList }
    }

    async getGiftsAll(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/gifts/all`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('popular')
        console.log(`List of gists is dispalyed`)
    }

    async sendGift(url: string, userToken: string, giftId: string, userId_2: string, myChatId_2: string, myStreamId_2: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "gift": `${giftId}`,
            "to": `${userId_2}`,
            "type": "other",
            "chatId": `${myChatId_2}`,
            "streamId": `${myStreamId_2}`
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/gifts/send`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const responseGiftId = response.giftId
        expect(responseGiftId).toEqual(giftId)
        console.log(`Gift with Id: ${responseGiftId} has been sent`)
    }
    async sendGiftShort(url: string, userToken: string, giftId: string, userId_2: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "gift": `${giftId}`,
            "to": `${userId_2}`,
            "type": "other",
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/gifts/send`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
    }

    async myGiftListSend(url: string, userToken: string, giftId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/gifts/my/listSent`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const responseGiftId = response[0].gift._id
        expect(responseGiftId).toContain(giftId)
        console.log(`List of sended gifts is diaplayed`)
    }

    async myGiftListReceived(url: string, userToken: string, giftId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/gifts/my/listReceived`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const responseGiftId = response[0].gift._id
        expect(responseGiftId).toContain(giftId)
        console.log(`List of received gifts is diaplayed`)
    }

    async getGiftsRecommendation(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/gifts/recommendation`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('popular')
        console.log(`List of reccomended gifts is diaplayed`)
    }

    async getGiftsPremium(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/gifts/premiumStream`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('popular')
        console.log(`List of premium gifts is displayed`)
    }

    async myTopGifters(url: string, userToken: string, streamerId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "streamerId": `${streamerId}`,
            "lastWeekOnly": false,
            "skip": 0,
            "itemsPerPage": 10
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/gifts/my/top-gifters`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('itemsPerPage')
        console.log(`List of my top gifts is displayed`)
    }

    async stremTopGifters(url: string, userToken: string, streamId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "streamId": `${streamId}`
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/gifts/stream-top-gifters`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`List of stream top gifters is displayed`)
    }

}