import { Locator, Page } from '@playwright/test'
import { apiUrl } from '../../utils/apiUrl'
import { apiDataSet } from '../../utils/dataSet'

export class AppChatPage {
    page: Page
    chatTextAreaLocator: Locator
    mainStatChatBtnLocator: Locator
    chatSearchFieldLocator: Locator
    createChatBtnLocator: Locator
    chatValidationErrorLocator: Locator
    contextMenuLocator: Locator
    blockUserBtnLocator: Locator
    confirmModalLocator: Locator
    contactSupportBtnLocator: Locator
    messageTimeIconLocator: Locator
    translateIconLocator: Locator
    startChatWithFirstSuggestedUserLocator: Locator
    chatTextArea2Locator: Locator
    atachmentBtnLocator: Locator
    mediaMessageLocator: Locator
    emojiBtnLocator: Locator

    constructor(page: Page) {
        this.page = page
        this.chatTextAreaLocator = page.locator('[placeholder="Send a message…"]')
        this.mainStatChatBtnLocator = page.locator('button.header-chat__button')
        this.chatSearchFieldLocator = page.locator('[placeholder="Search"]')
        this.createChatBtnLocator = page.locator('button.chat-modal__button')
        this.chatValidationErrorLocator = page.locator('p.chat-input-area__error')
        this.contextMenuLocator = page.locator('div.context-menu')
        this.blockUserBtnLocator = page.locator('//span[contains(text(),"Block User")]/..')
        this.confirmModalLocator = page.locator('button.confirm-modal__buttons--first')
        this.contactSupportBtnLocator = page.locator('[rel="noreferrer noopener"]')
        this.messageTimeIconLocator = page.locator('span.message-time')
        this.translateIconLocator = page.locator('svg.message__translate-icon')
        this.startChatWithFirstSuggestedUserLocator = page.locator('.chat-modal__card button').nth(0)
        this.chatTextArea2Locator = page.locator('div.chat-input-area__textarea')
        this.atachmentBtnLocator = page.locator('.chat-input-area__attach-btn')
        this.mediaMessageLocator = page.locator('div.chat-private-message-file__content')
        this.emojiBtnLocator = page.locator('button.chat-input-area__button-emoji-picker')
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}/chat`)
        await this.page.waitForLoadState('networkidle')
    }

    async clickStartChatButton() {
        await this.mainStatChatBtnLocator.click()
    }

    async startChetWithSpecificUser(userName: string) {
        await this.clickStartChatButton()
        await this.chatSearchFieldLocator.fill(userName)
        await this.createChatBtnLocator.click()
        await this.page.locator('span.header__user-name', { hasText: `${userName}` }).waitFor()
    }

    async observeNewMessage(message: string) {
        await this.page.locator('span.chat-message__text', { hasText: `${message}` }).waitFor()
    }

    async sendMessage(message: string) {
        await this.chatTextAreaLocator.fill(message)
        await this.page.keyboard.press('Enter')
        await this.observeNewMessage(message)
    }

    async sendMessage255Symbols(message = apiDataSet.message255Symbols) {
        await this.chatTextAreaLocator.fill(message)
        await this.chatValidationErrorLocator.waitFor()
        // await this.page.keyboard.press('Enter')
        // this.observeNewMessage(message)
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
        await this.contextMenuLocator.click()
    }

    async blockUser() {
        this.openConextMenu()
        await this.blockUserBtnLocator.click()
        await this.page.locator('div.confirm-modal__title', { hasText: 'Are you sure you want to block this user?' }).waitFor()
        await this.confirmModalLocator.click()
        await this.page.waitForURL(`${apiUrl.qaUiUrl}/chat`)
    }

    async doNotSeeChatForSpecificUser(username: string) {
        await this.page.locator('span.message-preview__context-name', { hasText: `${username}` }).waitFor({ state: 'detached' })
    }

    async observeSupportMessageTextContent() {
        await this.contactSupportBtnLocator.waitFor()
        await this.messageTimeIconLocator.waitFor()
        await this.page.locator('span.header__user-name', { hasText: 'Plamfy Support' }).waitFor()
        await this.translateIconLocator.waitFor()
    }

    async clickStartChatButtonWithFirstSuggestedUser() {
        await this.startChatWithFirstSuggestedUserLocator.click()
    }

    async observeBlockedChatForCoins() {
        await this.page.locator('span.chat-input-area__textarea--lock-text', { hasText: '45 coin/message' }).waitFor()
    }

    async unblockChat() {
        await this.chatTextArea2Locator.click()
    }

    async observeUnblockedChat() {
        await this.chatTextAreaLocator.waitFor()
    }

    async sendMediaFile() {
        this.page.on('filechooser', async (filechooser) => {
            await filechooser.setFiles('./utils/unnamed.jpg')
        })
        await this.atachmentBtnLocator.click()
        await this.page.waitForTimeout(1000)
        await this.page.waitForLoadState('networkidle')
        await this.mediaMessageLocator.waitFor()
    }

    async sendEmoji() {
        await this.emojiBtnLocator.click()
        await this.page.locator('[aria-label="👍, +1, thumbsup"]').nth(0).click()
        await this.page.keyboard.press('Enter')
        await this.observeNewMessage('👍')
    }
}
