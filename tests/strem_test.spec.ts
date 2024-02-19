import { apiUrl } from '../utils/apiUrl'
import { streamerAndWatcherFixture } from '../fixtures/fixtures'

let streamer_user, watcher_user

streamerAndWatcherFixture.describe('UI Stream Tests With Two Users', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer, watcher }) => {
        streamer_user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        watcher_user = await watcher.app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await streamer.api.followingPage.follow(apiUrl.qaEnvUrl, watcher_user.userToken, streamer_user.id)
    })

    streamerAndWatcherFixture('Send Gift in Stream', async ({ streamer, watcher, page }) => {
        await streamer.app.sidePanelPage.clickCreateStreamBtn()
        await streamer.app.preStreamPage.changeStreamTitle()
        await streamer.app.preStreamPage.clickStartStreamBtn()
        await streamer.app.preStreamPage.uploadAvatar()
        await streamer.app.preStreamPage.clickStartStreamBtn()
        await streamer.app.preStreamPage.observeStream()
        await page.waitForTimeout(1000)
        await watcher.app.mainPage.open()
        await watcher.app.mainPage.joinStream(streamer_user.name)
        await watcher.app.streamPage.waitForStreamLoadingWatcher()
        await watcher.app.streamPage.sentGift(watcher_user.name, 'flame_v1')
        await streamer.app.streamPage.observeRecivedGift(watcher_user.name, 'flame_v1') 
    })
})
