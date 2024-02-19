import { APIRequestContext, expect, request } from '@playwright/test'

export class ApiSlackPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async addCoins(humanReadebleId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const multipart = {
            command: '/qaplam',
            channel: 'C066KMR5TC4',
            blocks: `[{"type":"rich_text","elements":[{"type":"rich_text_section","elements":[{"type":"text","text":"add-coins-to-user ${humanReadebleId} 999"}]}]}]`,
            token: `${process.env.SLACK_TOKEN}`,
        }
        const apiRequest = await apiContext.post(`https://web4space.slack.com/api/chat.command`, {
            multipart: multipart,
            headers: {
                authority: 'web4space.slack.com',
                cookie: `${process.env.SLACK_COOKIE}`,
                origin: 'https://app.slack.com',
            },
        })
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        expect(response.ok).toBeTruthy()
        console.log(`Coins are added`)
    }

    async disableCloacing(humanReadebleId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const multipart = {
            command: '/qaplam',
            channel: 'C066KMR5TC4',
            blocks: `[{"type":"rich_text","elements":[{"type":"rich_text_section","elements":[{"type":"text","text":"dc ${humanReadebleId}"}]}]}]`,
            token: `${process.env.SLACK_TOKEN}`,
        }
        const apiRequest = await apiContext.post(`https://web4space.slack.com/api/chat.command`, {
            multipart: multipart,
            headers: {
                authority: 'web4space.slack.com',
                cookie: `${process.env.SLACK_COOKIE}`,
                origin: 'https://app.slack.com',
            },
        })
       // expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        expect(response.ok).toBeTruthy()
        console.log(`Coins are added`)
    }
}
