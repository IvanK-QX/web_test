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

    //stoplist bug 
    test.skip('Stoplist - Forbidden Words in Chat', async ({page}) => {
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

    test('Stoplist - Stream Titile', async ({page}) => {
        const app = new App(page)
        await app.sidePanelPage.clickCreateStreamBtn()
        await app.preStreamPage.clickStartStreamBtn()
        await app.preStreamPage.uploadAvatar()
        await app.preStreamPage.changeStreamTitle('blow job')
        await page.keyboard.press('Enter')
        await app.preStreamPage.observeInapproperiateError()
    })

    test('Stoplist - Stream Chat', async ({page}) => {
        const app = new App(page)
        await app.sidePanelPage.clickCreateStreamBtn()
        await app.preStreamPage.clickStartStreamBtn()
        await app.preStreamPage.uploadAvatar()
        await app.preStreamPage.clickStartStreamBtn()
        await app.preStreamPage.observeStream()
        await app.streamPage.sendMessageInStreamChat('bitch')
        await app.streamPage.observeModeratorMessage()
    })
})
