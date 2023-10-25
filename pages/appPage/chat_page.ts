import { Locator, Page } from "@playwright/test"
import { apiUrl } from "../../utils/apiUrl"

export class AppChatPage {
    page: Page
    chatTextAreaLocator: Locator

    constructor(page: Page) {
        this.page = page 
        this.chatTextAreaLocator = page.locator('[placeholder="Send a message…"]')
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}/chat`)
        await this.page.waitForLoadState('networkidle')
    }

    async startChetWithSpecificUser(userName: string) {
        await this.page.locator('button.header-chat__button').click()
        await this.page.locator('[placeholder="Search"]').fill(userName)
        await this.page.locator('button.chat-modal__button').click()
        await this.page.locator('span.header__user-name', {hasText: `${userName}`}).waitFor()
    }

    async observeNewMessage(message: string) {
        await this.page.locator('span.chat-message__text', {hasText: `${message}`}).waitFor()
    }

    async sendMessage(message: string) {
        await this.chatTextAreaLocator.fill(message)
        await this.page.keyboard.press('Enter')
        this.observeNewMessage(message)
    }

    async openExistingChat(userName: string) {
        await this.page.locator(`//span[contains(text(),'${userName}')]`).click()
    }

    async sendObusiveWord(word: string) {
        await this.chatTextAreaLocator.fill(word)
        await this.page.keyboard.press('Enter')
        this.observeNewMessage('*****')
    }

    async openConextMenu() {
        await this.page.locator('div.context-menu').click()
    }

    async blockUser() {
        this.openConextMenu()
        await this.page.locator('//span[contains(text(),"Block User")]/..').click()
        await this.page.locator('div.confirm-modal__title', {hasText: 'Are you sure you want to block this user?'}).waitFor()
        await this.page.locator('button.confirm-modal__buttons--first').click()
        await this.page.waitForURL(`${apiUrl.qaUiUrl}/chat`)
    }

    async doNotSeeChatForSpecificUser(username: string) {
        await this.page.locator('span.message-preview__context-name', {hasText: `${username}`}).waitFor({state: 'detached'})
    }


}