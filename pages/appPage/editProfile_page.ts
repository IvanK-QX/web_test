import { Locator, Page } from "@playwright/test"
import { apiUrl } from "../../utils/apiUrl"

export class AppEditProfilePage {
    page: Page
    nameField: Locator
    bioField: Locator
    dateField: Locator
    saveBtn: Locator
    successPoup: Locator

    constructor(page: Page) {
        this.page = page 
        this.nameField = page.locator('[placeholder="Name"]')
        this.bioField = page.locator('[placeholder="I am a singer"]')
        this.dateField = page.locator('input.ui-datepicker__input')
        this.saveBtn = page.getByRole('button', { name: 'Save' })
        this.successPoup = page.locator('.success')
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}/edit`)
        await this.page.waitForLoadState('networkidle')
    }

    async chageName(name: string){ 
        await this.nameField.fill(name)
    }

    async chageBio(bio: string){ 
        await this.bioField.fill(bio)
    }

    async selectDate() {
        await this.dateField.hover()
        await this.page.getByRole('button', { name: 'Saturday, Oct 1, 2005' }).click();
    }

    async clickSaveBtn() {
        await this.saveBtn.click();
        await this.successPoup.waitFor()
    }


    


}