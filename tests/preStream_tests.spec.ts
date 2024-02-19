import { apiUrl } from '../utils/apiUrl'
import { streamerAndWatcherFixture } from '../fixtures/fixtures'


streamerAndWatcherFixture.describe('UI Stream Tests With Two Users', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer }) => {
        await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl)

    })

    streamerAndWatcherFixture('All Prestream Elements Loaded ', async ({ streamer }) => {
        await streamer.app.ediProfilePage.open()
        await streamer.app.sidePanelPage.clickCreateStreamBtn()
        await streamer.app.preStreamPage.observeCameraDropdown()
        await streamer.app.preStreamPage.observeMicrophoneDropdown()
        await streamer.app.preStreamPage.observeStreamTitle()
        await streamer.app.preStreamPage.observePreStreamAttributes()
    })

    streamerAndWatcherFixture('Pre Stream - Disable Camera', async ({ streamer }) => {
        await streamer.app.ediProfilePage.open()
        await streamer.app.sidePanelPage.clickCreateStreamBtn()
        await streamer.app.preStreamPage.disableCamera()
    })

    streamerAndWatcherFixture('Pre Stream - Close Pre Stream', async ({ streamer }) => {
        await streamer.app.ediProfilePage.open()
        await streamer.app.sidePanelPage.clickCreateStreamBtn()
        await streamer.app.preStreamPage.closeStreamSnackbar()
    })
})
