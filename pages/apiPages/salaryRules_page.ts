import { APIRequestContext, expect, request } from "@playwright/test"
import { Headers } from "../../utils/headers"
import { SalaryRulesPayloads } from "./salaryRules_payload"

export class ApiSalaryRulesPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async createRule(url: string, adminToken: string, myStreamerId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = SalaryRulesPayloads.createRule(myStreamerId)
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/rules/create`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const botRuleId = response._id
        const streamerIds = response.streamerIds[0]
        expect(streamerIds).toEqual(myStreamerId)
        console.log(`Rule with id: ${botRuleId} is created`)
        return { botRuleId }
    }

    async updateRule(url: string, adminToken: string, myStreamerId: string, botRuleId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = SalaryRulesPayloads.updateRule(myStreamerId, botRuleId)
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/rules/update`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const id = response._id
        expect(id).toEqual(botRuleId)
        console.log(`Rule with id: ${botRuleId} is updated`)
    }

    async getRulesList(url: string, adminToken: string, botRuleId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/rules/list`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain(botRuleId)
        console.log(`List of Rules is displayed`)
    }

    async  createBotRule(url: string, adminToken: string, botRuleId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = SalaryRulesPayloads.createBotRule(botRuleId)
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/bot/rules/create`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const secondBotRuleId = response._id
        const salaryRuleIds = response.salaryRuleIds[0] 
        expect(salaryRuleIds).toEqual(botRuleId)
        console.log(`Bot Rule with id: ${secondBotRuleId} is added`)
        return {secondBotRuleId }
    }

    async  updateBotRule(url: string, adminToken: string, secondBotRuleId: string, botRuleId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = SalaryRulesPayloads.updateBotRule(secondBotRuleId, botRuleId)
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/bot/rules/update`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const id = response._id
        expect(id).toEqual(secondBotRuleId)
        console.log(`Bot Rule with id: ${secondBotRuleId} is updated`)
    }

    async getBoteRulesList(url: string, adminToken: string, secondBotRuleId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/bot/rules/list`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain(secondBotRuleId)
        console.log(`List of Bot Rules is displayed`)
    }

    async getRulesByUser(url: string, userToken: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/rules/byUser`, { headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        console.log(`List of Rules for user is displayed`)
    }

}