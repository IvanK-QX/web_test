import { request, test } from '@playwright/test'
import { apiUrl } from '../utils/apiUrl'
import { App } from '../pages/App'
import { Api } from '../pages/Api'

let streamer, watcher, newPage, watcherPage

test.describe('UI Stream Tests', async () => {
    test.beforeEach(async ({ page, browser }) => {
        const apiContext = await request.newContext()
        const contetext = await browser.newContext()
        newPage = await contetext.newPage()
        const app = new App(page)
        const api = new Api(apiContext)
        watcherPage = new App(newPage)
        streamer = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        watcher = await watcherPage.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await api.followingPage.follow(apiUrl.qaEnvUrl, watcher.userToken, streamer.id)
    })

    test('Send Gift in Stream', async ({ page }) => {
        const app = new App(page)
        const watcherPage = new App(newPage)
        await app.ediProfilePage.open()
        await app.sidePanelPage.clickCreateStreamBtn()
        await app.preStreamPage.changeStreamTitle()
        await app.preStreamPage.clickStartStreamBtn()
        await app.preStreamPage.uploadAvatar()
        await app.preStreamPage.clickStartStreamBtn()
        await app.preStreamPage.observeStream()
        await watcherPage.sidePanelPage.clickCreateStreamBtn()
        await page.waitForTimeout(1000)
        await watcherPage.mainPage.open()
        await watcherPage.mainPage.joinStream(streamer.name)
        await watcherPage.streamPage.waitForStreamLoadingWatcher()
        await watcherPage.streamPage.sentGift(watcher.name, 'flame_v1')
        await app.streamPage.observeRecivedGift(watcher.name, 'flame_v1') 
    })
})
