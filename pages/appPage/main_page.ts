import { Locator, Page } from '@playwright/test'
import { apiUrl } from '../../utils/apiUrl'

export class AppMainPage {
    page: Page
    searchField: Locator
    searchContent: Locator

    constructor(page: Page) {
        this.page = page
        this.searchField = page.locator('[placeholder="Search Everything"]')
        this.searchContent = page.locator('div.search__content--loaded')
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}`)
        await this.page.waitForLoadState()
    }

    async clickOnStream(streamerName: string) {
        await this.page.locator(`//span[contains(text(),'${streamerName}')]`).click()
        await this.page.waitForLoadState()
    }

    async joinStream(streamerName: string) {
        await this.page.waitForTimeout(1500)
        await this.page.reload({ waitUntil: 'domcontentloaded' })
        await this.page.reload({ waitUntil: 'domcontentloaded' })
        this.clickOnStream(streamerName)
    }

    async searchUserByName(name: string) {
        await this.searchField.fill(name)
        await this.page.keyboard.press('Enter')
        await this.searchContent.waitFor()
    }

    async validateCorrectSearch(userName = '50cent') {
        await this.page.locator('div.user-info-card__content--name', { hasText: `${userName}` }).waitFor()
    }
}
