import { expect, request, test } from "@playwright/test";
import { apiUrl } from "../utils/apiUrl";
import { apiDataSet } from "../utils/dataSet";
import { App } from '../pages/App'
import { Api } from "../pages/Api";

let streamer, watcher, newPage, watcherPage

test.describe('UI Tests', async () => {
    test.beforeEach(async ({page, browser}) => {
        const apiContext = await request.newContext()
        const contetext = await browser.newContext();
        newPage = await contetext.newPage()
        const app = new App(page)
        const api = new Api(apiContext)
        watcherPage = new App(newPage)
        streamer = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        watcher = await watcherPage.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await api.followingPage.follow(apiUrl.qaEnvUrl, watcher.userToken, streamer.id)
        console.log(streamer.id)
    })

    test.afterEach(async () => {
        const apiContext = await request.newContext()
        const api = new Api(apiContext)
        await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer.userToken)
        await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, watcher.userToken)
    })

    test('Star sand Join Stream',async ({page}) => {
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
        await watcherPage.streamPage.sendMessageInStreamChat(apiDataSet.uiStreamMessage)
        await app.streamPage.observeReceivedMessage(apiDataSet.uiStreamMessage)
        await watcherPage.streamPage.sendMessageInStreamChat("bitch")
        await watcherPage.streamPage.observeModeratorMessage()
        await app.streamPage.openWatchersList()
        await app.streamPage.clickFollowOnWatchersList()
        await app.streamPage.closeWatchersList()
        await app.streamPage.closeStreamAsStreamer()
        await watcherPage.streamPage.closeEndStreamModalAsWatcher()
        await app.chatPage.open()
        await app.chatPage.startChetWithSpecificUser(watcher.name)
        await app.chatPage.sendMessage('hello')
        await watcherPage.chatPage.open()
        await watcherPage.chatPage.openExistingChat(streamer.name)
        await watcherPage.chatPage.observeNewMessage('hello')
        await watcherPage.chatPage.sendMessage('bitch')
        await watcherPage.chatPage.observeNewMessage('bitch')
      //   await watcherPage.chatPage.sendObusiveWord('bitch')
        await app.chatPage.observeNewMessage('bitch')
        await app.chatPage.blockUser()
        await app.chatPage.doNotSeeChatForSpecificUser(watcher.name)
        await app.blockedPage.open()
        await app.blockedPage.oberveBlockedUser(watcher.name)
        await app.blockedPage.unblockUser(watcher.name)
        await app.blockedPage.doNotOberveBlockedUser(watcher.name)
  
      })
})


