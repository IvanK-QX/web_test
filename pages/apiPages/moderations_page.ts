import { APIRequestContext, expect, request } from "@playwright/test"
import { Headers } from "../../utils/headers"
import { ModerationsPayloads } from "./moderations_payloads";

export class ApiModerationsPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async setForbiddenWord(url: string, adminToken: string, forbiddenWord: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "words": [
                `${forbiddenWord}`
            ]
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/forbiidenWords`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const setForbiddenWord = response[0].text
        const forbiddenWordId = response[0]._id
        expect(forbiddenWord).toEqual(setForbiddenWord)
        console.log(`The Forbidden Word: ${forbiddenWord} is set`)
        return { setForbiddenWord, forbiddenWordId }

    }

    async setAbusiveWord(url: string, adminToken: string, abusiveWord: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "words": [
                `${abusiveWord}`
            ]
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/abusiveWords`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const setAbusiveWord = response[0].text
        const abusiveWordId = response[0]._id
        expect(abusiveWord).toEqual(setAbusiveWord)
        console.log(`The Forbidden Word: ${abusiveWord} is set`)
        return { setAbusiveWord, abusiveWordId  }

    }

    async forbiddenWordDelete(url: string, adminToken: string, forbiddenWordId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "ids": [
                `${forbiddenWordId}`
            ]
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/forbiidenWords/delete`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`The Forbidden Word is Deleted`)
    
    }

    async abusiveWordDelete(url: string, adminToken: string, abusiveWordId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "ids": [
                `${abusiveWordId}`
            ]
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/abusiveWords/delete`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`The Abusive Word is Deleted`)
    
    }

    async actionsOnOtherUser(url: string, userToken: string, userId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = ModerationsPayloads.actionsOnOtherUser(userId)
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/actionsOnOtherUser`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const returnedStreamerId = response.documents[0].streamerId
        expect(userId).toEqual(returnedStreamerId)
        console.log(`The Action is displayed`)
    
    }

    async suspendActionRemove(url: string, adminToken: string, actionId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "actionId": `${actionId}`
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/suspend-action/remove`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const returnedActionId = response.deletedAction._id
        const RemoveStatus = response.success
        expect(actionId).toEqual(returnedActionId)
        expect(RemoveStatus).toEqual(true)
        console.log(`The Action with Id: ${actionId} is Deleted`)
    
    }

    async getUpdatedUsersList(url: string, adminToken: string, moderatorHumanReadableId: number, humanReadableId: number) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = ModerationsPayloads.getUpdatedUsersList(moderatorHumanReadableId, humanReadableId)
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/moderation/updatedUser/list`, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const updatedHumanReadableId = response.documents[0].userHumanReadableId
        const updatedByModeratorHumanReadableId = response.documents[0].moderatorHumanReadableId
        expect(humanReadableId).toEqual(updatedHumanReadableId)
        expect(moderatorHumanReadableId).toEqual(updatedByModeratorHumanReadableId)
        console.log(`The Updated User List is displayed`)
    
    }

    async chekIfForbiddenWordIsAdded(url: string, adminToken: string, forbiddenWord:string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/moderation/forbiidenWords`, {headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain(forbiddenWord)
        console.log(`The Forbidden Word: ${forbiddenWord} is added`)

    }

    async chekIfForbiddenWordIsDeleted(url: string, adminToken: string, forbiddenWord:string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/moderation/forbiidenWords`, {headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).not.toContain(forbiddenWord)
        console.log(`The Forbidden Word: ${forbiddenWord} is deleted`)

    }

    async chekIfAbusiveWordIsAdded(url: string, adminToken: string, abusiveWord:string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/moderation/abusiveWords`, {headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).toContain(abusiveWord)
        console.log(`The Abusive Word: ${abusiveWord} is added`)

    }

    async chekIfAbusiveWordIsDeleted(url: string, adminToken: string, abusiveWord:string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.get(`${url}:3000/moderation/abusiveWords`, {headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.text()
        expect(response).not.toContain(abusiveWord)
        console.log(`The Abusive Word: ${abusiveWord} is deleted`)

    }

}