import { APIRequestContext, expect, request } from "@playwright/test"
import { faker } from '@faker-js/faker';
import { apiDataSet } from "../../utils/dataSet";
import { Headers } from "../../utils/headers";

export class ApiLoginPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async login(url: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            authProvider: "ownDeviceId",
            deviceId: `${faker.string.uuid()}`,
            language: "uk"
        }
        const headers = Headers.guestHeader()
        const apiRequest = await apiContext.post(url, {data, headers: headers})
        const response = await apiRequest.json()
        expect(apiRequest.ok()).toBeTruthy()
        const token = response.token
        const id = response.profile._id
        expect(response.profile.status).toEqual('Active')
        console.log(`Guest with userID: ${id} logged into the app`)
        return { token, id} 
    }

    async adminLogin(url: string, adminGuestToken: string, deviceId: string, email: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            "authProvider": "ownEmail",
            "email": `${email}@gmail.com`,
            "password": `${apiDataSet.password}`,
            "guestUserToken": `${adminGuestToken}`,
            "deviceId": `${deviceId}`,
            "language": "uk",
            "version": 1
        }
        const headers = {
            'packagename': 'com.plamfy',
            'content-type': 'application/json',
            'appversion': '1',
            'os': 'browser'
        }
        const apiRequest = await apiContext.post(url, {data, headers: headers})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const adminToken = response.token
        const id = response.profile._id
        const rolesGroup = response.profile.rolesGroup
        const adminHumanReadableId = response.profile.humanReadableId
        expect(rolesGroup).toEqual('admin')
        console.log(`Admin with: ${id} logged into the app`)
        return { adminToken, id, adminHumanReadableId } 
    }

    async addEmail(url: string, token: string, deviceId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const data = {
            authProvider:"ownEmail",
            email: `api+${Math.floor(Math.random() * (999999-100000) + 100000)}@unitedtech.ai`,
            password: "123456",
            deviceId: `${deviceId}`,
            language: "uk",
            pushToken: "string",
            guestUserToken: `${token}`
        }
        const headers = {
            'packagename': 'com.plamfy',
            'content-type': 'application/json',
            'appversion': '1',
            'os': 'browser'
        }
        const apiRequest = await apiContext.post(url, {data, headers: headers})
        const response = await apiRequest.json()
        expect(apiRequest.ok()).toBeTruthy()
        const email = response.profile.email
        const userToken = response.token
        const id = response.profile._id
        const createdUser = response.profile.createdUser
        const name = response.profile.name
        const createdGuest = response.profile.createdGuest
        const humanReadableId = response.profile.humanReadableId
        const country = response.profile.lastGeo.country
        const referalLink = response.profile.referalLink
        const abTests = response.profile.abTests
        expect(response.profile.status).toEqual('Active')
        console.log(`User email: ${email} has been added`)
        return { userToken, email, id, createdUser, name, createdGuest, humanReadableId, country, referalLink, abTests}
    }

    async createNewUser(url: string) {
        const login = await this.login(`${url}:3000/login`)
        return await this.addEmail(`${url}:3000/login`, login.token, faker.string.uuid())
    }

    async loginWithAdminUser(url: string) {
        const adminLogin = await this.login(`${url}:3000/login`)
        return await this.adminLogin(`${url}:3000/admin/login`, adminLogin.token, faker.string.uuid(), apiDataSet.email)
    
    }
}