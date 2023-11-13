import { Page } from "@playwright/test"
import { apiUrl } from "../../utils/apiUrl"

export class AppBlockedPage {
    page: Page

    constructor(page: Page) {
        this.page = page 
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}/blocked`)
        // await this.page.waitForLoadState('networkidle')
    }

    async oberveBlockedUser(userName: string) {
        await this.page.locator('.blocked-user-card__name', {hasText: `${userName}`}).waitFor()
    }

    async doNotOberveBlockedUser(userName: string) {
        await this.page.locator('.blocked-user-card__name', {hasText: `${userName}`}).waitFor({state: 'detached'})
    }

    async unblockUser(userName: string) {
        await this.page.getByText('Unblock').click()
        await this.page.getByText(`Are you sure you want to unblock ${userName}?`).waitFor();
        await this.page.getByRole('button', { name: 'Unblock' }).nth(1).click();
    }



}