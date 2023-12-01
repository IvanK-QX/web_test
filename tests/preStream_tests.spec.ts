import { test } from '@playwright/test'
import { apiUrl } from '../utils/apiUrl'
import { App } from '../pages/App'


test.describe('UI Stream Tests With Two Users', async () => {
    test.beforeEach(async ({ page }) => {
        const app = new App(page)
        await app.loginPage.apiLogin(apiUrl.qaEnvUrl)

    })

    test('All Prestream Elements Loaded ', async ({ page }) => {
        const app = new App(page)
        await app.ediProfilePage.open()
        await app.sidePanelPage.clickCreateStreamBtn()
        await app.preStreamPage.observeCameraDropdown()
        await app.preStreamPage.observeMicrophoneDropdown()
        await app.preStreamPage.observeStreamTitle()
        await app.preStreamPage.observePreStreamAttributes()
    })

    test('Pre Stream - Disable Camera', async ({ page }) => {
        const app = new App(page)
        await app.ediProfilePage.open()
        await app.sidePanelPage.clickCreateStreamBtn()
        await app.preStreamPage.disableCamera()
    })

    test('Pre Stream - Close Pre Stream', async ({ page }) => {
        const app = new App(page)
        await app.ediProfilePage.open()
        await app.sidePanelPage.clickCreateStreamBtn()
        await app.preStreamPage.closeStreamSnackbar()
    })
})
