import { Page } from "@playwright/test"
import { apiUrl } from "../../utils/apiUrl"

export class AppMainPage {
    page: Page

    constructor(page: Page) {
        this.page = page 
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
        await this.page.reload({waitUntil: 'domcontentloaded'})
        await this.page.reload({waitUntil: 'domcontentloaded'})
        this.clickOnStream(streamerName)
    }


}