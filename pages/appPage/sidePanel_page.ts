import { Page } from '@playwright/test'

export class AppSidePanelPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickCreateStreamBtn() {
        await this.page.locator('.sidebar__create-button').click()
        await this.page.locator('[placeholder="Stream title"]').waitFor()
    }
}
