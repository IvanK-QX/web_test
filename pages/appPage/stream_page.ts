import { Page, expect } from '@playwright/test'
import { apiUrl } from '../../utils/apiUrl'

export class AppStreamPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForStreamLoadingWatcher() {
        await this.page.locator('div.single-stream__actions').waitFor()
        await this.page.locator('div.gift-shop-box__header').waitFor()
        await this.page.locator('div.chat-system-message').waitFor()
    }

    async sendMessageInStreamChat(message: string) {
        await this.page.locator('[placeholder="Send a message…"]').fill(message)
        await this.page.keyboard.press('Enter')
    }

    async observeModeratorMessage() {
        await this.page.locator('div.chat-system-moderator-message').waitFor()
    }

    async observeReceivedMessage(message: string) {
        await expect(this.page.getByText(message)).toBeVisible()
    }

    async closeStreamAsStreamer() {
        await this.page.locator('button svg.stream-button-close__icon').click()
        await this.page.locator('button.confirm-modal__buttons--second').click()
        await this.page.locator('.modal-close').click()
        await this.page.waitForURL(`${apiUrl.qaUiUrl}`)
    }

    async openWatchersList() {
        await this.page.locator('span.stream-users-watch__pin').waitFor()
        await this.page.locator('span.stream-users-watch__pin').click()
        await this.page.locator('h3.user-info-list-modal__title').waitFor()
    }

    async closeWatchersList() {
        await this.page.locator('.modal-close').click()
    }

    async clickFollowOnWatchersList() {
        await this.page.getByRole('button', { name: 'Follow' }).click()
    }

    async closeEndStreamModalAsWatcher() {
        await expect(this.page.getByText('This stream ended')).toBeVisible()
        await this.page.locator('[aria-label="Close"]').click()
    }

    async sentGift(myName: string, gift: 'flame_v1' | 'chocolate_candies' ) {
        await this.page.waitForTimeout(500)
        await this.page.locator(`//*[@alt="${gift}.png Gift Image"]/../..`).nth(1).click()
        await this.page.locator('.chat-system-send-gift__user-name', {hasText: `${myName}`}).waitFor()
        await this.page.locator(`.chat-system-send-gift__gift-wrapper [src="https://media.streamsqa.com/${gift}.png"]`).waitFor()
    }

    async observeRecivedGift(senderName: string, gift: 'flame_v1' | 'chocolate_candies' ) {
        await this.page.locator('.chat-system-send-gift__user-name', {hasText: `${senderName}`}).waitFor()
        await this.page.locator(`img[alt="Gift ${gift}.png picture"]`).waitFor()
    }
}
