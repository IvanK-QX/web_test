import { test } from '@playwright/test'
import { apiUrl } from '../utils/apiUrl'
import { App } from '../pages/App'

test.describe('UI - Search Tests', async () => {
    test.beforeEach(async ({ page }) => {
        const app = new App(page)
        await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await page.goto('/')
    })

    test('Chats - Search by name ', async ({ page }) => {
        const app = new App(page)
        await app.mainPage.searchUserByName('50cent')
        await app.mainPage.validateCorrectSearch('50cent')
    })

    test('Chats - Unblock Chat', async ({ page }) => {
        const app = new App(page)
        await app.mainPage.searchUserByName('7879')
        await app.mainPage.validateCorrectSearch('50cent')
    })
})
