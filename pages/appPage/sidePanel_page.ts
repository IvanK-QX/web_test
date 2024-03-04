import { Page, expect } from '@playwright/test';

export class AppSidePanelPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickCreateStreamBtn() {
        await this.page.locator('.sidebar__create button').click();
        await expect(this.page.locator('div.create-stream__actions')).toBeVisible();
    }
}
