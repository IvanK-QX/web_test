import { APIRequestContext, expect, request } from '@playwright/test'
import { Headers } from '../../utils/headers'
import { faker } from '@faker-js/faker'
export class ApiOtherPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async getFeatureFlag(url: string, adminToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/featureFlag`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('offSpecialOfferAfter24h')
        console.log(`Feture flags are displayed`)
    }

    async snapAuth(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            additionalProp1: {},
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/snap/auth`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`Snap Auth passed`)
    }

    async snapInit(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            code: 'any',
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/snap/init`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`Snap Init passed`)
    }

    async getShopList(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/shop`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const title = response.title
        expect(title).toEqual('Shop title')
        console.log(`Shop is displayed`)
    }

    async getRatios(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/ratios`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const coinsPerDiamond = response.coinsPerDiamond
        expect(coinsPerDiamond).toEqual(1)
        console.log(`Ratios is received`)
    }

    async getCoinsBoughtLast30Days(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/purchases/coinsBoughtLast30Days`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const coins = response.coins
        expect(coins).toEqual(0)
        console.log(`coinsBoughtLast30Days is displayed`)
    }

    async lastLaunch(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            deviceId: `${faker.string.uuid()}`,
            language: 'UK',
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/lastLaunch`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`Last launch info is received`)
    }

    async getModelProblem(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/modelProblem`, { headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('ps')
        expect(response).toContain('cs')
        console.log(`Model Problem is displayed`)
    }

    async mounthlyBonus(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            year: 3000,
            month: 12,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/bonuses/monthlyBonus`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const hoursStreamed = response.hoursStreamed
        const diamondsEarned = response.diamondsEarned
        const numberOfSuspends = response.numberOfSuspends
        expect(numberOfSuspends).toEqual(0)
        expect(diamondsEarned).toEqual(0)
        expect(hoursStreamed).toEqual(0)
        console.log(`Mounthly bonuses is displayed`)
    }

    async agentBonus(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            year: 3000,
            month: 12,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/bonuses/agentMonthlyBonus`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain('0')
        console.log(`Agent Mounthly bonuses is displayed`)
    }
}
