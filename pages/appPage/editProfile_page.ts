import { Locator, Page } from '@playwright/test'
import { apiUrl } from '../../utils/apiUrl'
import { texts } from '../../utils/dataSet'

export class AppEditProfilePage {
    page: Page
    nameField: Locator
    bioField: Locator
    dateField: Locator
    saveBtn: Locator
    successPoup: Locator
    previosArrowBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.nameField = page.locator('[placeholder="Name"]')
        this.bioField = page.locator('[placeholder="I am a singer"]')
        this.dateField = page.locator('input.ui-datepicker__input')
        this.saveBtn = page.locator('span.ui-button__content', {hasText: texts.save})
        this.successPoup = page.locator('.success')
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}/edit`)
        await this.page.waitForLoadState('networkidle')
    }

    async chageName(name: string) {
        await this.nameField.fill(name)
    }

    async chageBio(bio: string) {
        await this.bioField.fill(bio)
    }

    async selectDate() {
        await this.dateField.hover()
        await this.page.locator('div.day-1.on-top').click()
    }

    async clickSaveBtn() {
        await this.saveBtn.click()
        await this.successPoup.waitFor({ state: 'attached' })
    }

    async setInappropriateName(name: string) {
        this.chageName(name)
        await this.saveBtn.click()
        await this.page.locator('.ui-input__error-text', {hasText: texts.profileInappropriateValidationText}).waitFor()
    }
}
