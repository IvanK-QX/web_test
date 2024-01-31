import { APIRequestContext, expect, request } from '@playwright/test'
import { Headers } from '../../utils/headers'
import * as fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fs = require('fs')

export class ApiProfilePage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async editProfile(url: string, userToken: string, name: string, about: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            name: `${name}`,
            about: `${about}`,
            gender: 'iPreferNotToSay',
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/profile`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const userName = response.name
        const userAbout = response.about
        expect(userName).toEqual(name)
        expect(userAbout).toEqual(about)
        console.log(`Profile has been changed`)
    }

    async getProfile(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.get(`${url}:3000/profile`, { headers: headers })
        const response = await apiRequest.json()
        expect(apiRequest.ok()).toBeTruthy()
        const payoneerEmail = response.payoutEmail || null
        const binanceWallet = response.cryptoWallet || null
        return { payoneerEmail, binanceWallet }
    }

    async search(url: string, userToken: string, searchText: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            text: `${searchText}`,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/find`, { data, headers: headers })
        const response = await apiRequest.json()
        expect(apiRequest.ok()).toBeTruthy()
        const name = response[0].name
        const id = response[0]._id
        expect(name).toEqual(searchText)
        console.log(`User with name: ${searchText} was found`)
        return { id }
    }

    async otherUserProfile(url: string, userToken: string, otherUserId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            otherUserId: `${otherUserId}`,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/otherUserProfile`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const userID = response._id
        expect(userID).toEqual(otherUserId)
        console.log(`Profile with id: ${userID} is displayed`)
    }

    async createFileuplaod(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            extension: 'jpg',
            flow: 'editProfile',
            purpose: 'avatar',
            type: 'photo',
        }
        const apiRequest = await apiContext.post(`${url}:3000/createFileUpload`, { data, headers: Headers.userHeader(userToken) })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const uploadID = response.tempUploadId
        const uploadUrl = response.url
        const uploadKey = Object.values(response.fields)[0]
        const xAmzTagging = Object.values(response.fields)[1]
        const bucket = Object.values(response.fields)[2]
        const xAmzAlgorithm = Object.values(response.fields)[3]
        const xAmzCredential = Object.values(response.fields)[4]
        const xAmzDate = Object.values(response.fields)[5]
        const policy = Object.values(response.fields)[6]
        const xAmzSignature = Object.values(response.fields)[7]
        console.log(`URL for upload : ${uploadUrl} is generated`)
        return { uploadID, uploadUrl, uploadKey, xAmzTagging, bucket, xAmzAlgorithm, xAmzCredential, xAmzDate, policy, xAmzSignature }
    }

    async uploadToS3(
        url: string,
        userToken: string,
        uploadKey: string,
        xAmzTagging: string,
        bucket: string,
        xAmzAlgorithm: string,
        xAmzCredential: string,
        xAmzDate: string,
        policy: string,
        xAmzSignature: string
    ) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })

        const stream = fs.createReadStream('unnamed.jpg')
        console.log('before request')
        const multipart = {
            key: uploadKey,
            'x-amz-tagging': xAmzTagging,
            bucket: bucket,
            'X-Amz-Algorithm': xAmzAlgorithm,
            'X-Amz-Credential': xAmzCredential,
            'X-Amz-Date': xAmzDate,
            Policy: policy,
            'X-Amz-Signature': xAmzSignature,
            File: stream,
        }
        const apiRequest = await apiContext.post(`${url}`, {
            multipart: multipart,
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${userToken}`,
                packagename: 'com.plamfy',
                appversion: '1',
                os: 'ios',
            },
        })
        console.log(apiRequest.status())
        console.log('after request')
        expect(apiRequest.ok()).toBeTruthy()
        console.log(`file uploaded to s3 bucket`)
    }

    async updateProfileCover(url: string, userToken: string, uploadId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            avatarPicture: `${uploadId}`,
            avatarPictureSmall: `${uploadId}`,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/profileAvatar`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const avatarPicture = response.avatarPicture
        expect(avatarPicture).toEqual(uploadId)
        console.log(`Avatar with id: ${uploadId} is uploaded`)
    }

    async inviteToSteram(url: string, userToken: string, option: boolean) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            allowedInviteToStream: option,
        }
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/profile/setAllowedInviteToStream`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const allowedInviteToStream = response.allowedInviteToStream
        expect(allowedInviteToStream).toEqual(option)
        console.log(`Invite to stream is: ${option}`)
    }

    async allowedToStartPremium(url: string, adminToken: string, userId: string, option: boolean) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            userId: `${userId}`,
            allowedToStartPremium: option,
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/admin/profile/allowedToStartPremium`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const allowedToStartPremium = response.allowedToStartPremium
        expect(allowedToStartPremium).toEqual(option)
        console.log(`User with id: ${userId} is allowedToStartPremium: ${option}`)
    }

    async addDiamonds(url: string, adminToken: string, userId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            userId: `${userId}`,
            diamonds: 100000,
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/profile/balance/diamonds`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        expect(response.diamondsAllTime).toEqual(110000)
        console.log(`Dimonds ${response.diamondsAllTime} is added for user: ${userId}`)
    }

    async kyc(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {}
        const headers = Headers.userHeader(userToken)

        const apiRequest = await apiContext.post(`${url}:3000/profile/kyc`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        const idvId = response.idvId
        console.log(`IDV is received`)
        return { idvId }
    }
}
