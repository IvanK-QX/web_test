import { request, test } from '@playwright/test'
import { apiUrl } from '../utils/apiUrl'
import { apiDataSet } from '../utils/dataSet'
import { App } from '../pages/App'
import { Api } from '../pages/Api'

let user, watcher

test.describe('UI - Chat Tests', async () => {
    test.beforeEach(async ({ page }) => {
        const app = new App(page)
        user = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await app.chatPage.open()
    })

    test('Chats - Default System Messge', async ({ page }) => {
        const app = new App(page)
        await app.chatPage.openExistingChat('Plamfy')
        await app.chatPage.observeSupportMessageTextContent()
    })

    test('Chats - Unblock Chat', async ({ page }) => {
        const app = new App(page)
        await app.chatPage.clickStartChatButton()
        await app.chatPage.clickStartChatButtonWithFirstSuggestedUser()
        await app.chatPage.observeBlockedChatForCoins()
        await app.chatPage.unblockChat()
    })
})

test.describe('UI - Chat Page With Two Users', async () => {
    test.beforeEach(async ({ page }) => {
        const apiContext = await request.newContext()
        const app = new App(page)
        user = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        const api = new Api(apiContext)
        watcher = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
        await api.followingPage.follow(apiUrl.qaEnvUrl, watcher.userToken, user.id)
        await api.followingPage.follow(apiUrl.qaEnvUrl, user.userToken, watcher.id)
        await app.chatPage.open()
        await api.slackPage.addCoins(user.humanReadableId)
    })

    test('Chats - Unblock Chat By Followings', async ({ page }) => {
        const app = new App(page)
        await app.chatPage.startChetWithSpecificUser(watcher.name)
        await app.chatPage.observeUnblockedChat()
    })

    test('Chats - Message Validation', async ({ page }) => {
        const app = new App(page)
        await app.chatPage.startChetWithSpecificUser(watcher.name)
        await app.chatPage.sendMessage(apiDataSet.validationMessageText)
        await app.chatPage.sendMessage(apiDataSet.message254Symbols)
        await app.chatPage.sendMessage255Symbols()
    })

    test('Chats - Send Media File', async ({ page }) => {
        const app = new App(page)
        await app.chatPage.startChetWithSpecificUser(watcher.name)
        await app.chatPage.sendMediaFile()
    })

    test('Chats - Send Emoji', async ({ page }) => {
        const app = new App(page)
        await app.chatPage.startChetWithSpecificUser(watcher.name)
        await app.chatPage.sendEmoji()
    })
})
