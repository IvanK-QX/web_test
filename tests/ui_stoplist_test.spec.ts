import { request, test } from "@playwright/test";
import { App } from "../pages/App";
import { apiUrl } from "../utils/apiUrl";
import { Api } from "../pages/Api";
let user

test.describe('UI - Profile Tests', async () => {
    test.beforeEach(async ({page}) => {
        const app = new App(page)
        user = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await app.profilePage.open()
    })

    test('Stoplist - Forbidden Name', async ({page}) => {
        const app = new App(page)
        await app.ediProfilePage.open()
        await app.ediProfilePage.setInappropriateName('penis')
    })

    test('Stoplist - Forbidden Words in Chat', async ({page}) => {
        const app = new App(page)
        const apiContext = await request.newContext()
        const api = new Api(apiContext)
        const watcher = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
        await api.followingPage.follow(apiUrl.qaEnvUrl, watcher.userToken, user.id)
        await api.followingPage.follow(apiUrl.qaEnvUrl, user.userToken, watcher.id)
        await app.chatPage.open()
        await app.chatPage.startChetWithSpecificUser(watcher.name)
        await app.chatPage.sendMessageFromBlocklist('tango')

    })
})
