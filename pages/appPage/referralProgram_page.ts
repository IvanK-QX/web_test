import { expect, Page } from '@playwright/test'
import { locators } from './locators'


export class AppReferralPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickProfileBtn() {
        await this.page.locator(locators.mainPage.profileBtn).click()
    }

    async clickReferralProgramBtn() {
        await this.page.locator(locators.referralPage.referralProgramBtn).click()
    }

    async clickCopyCodeBtn() {
        await this.page.locator('.referral-program__button', {hasText: 'Copy code'}).click()
    }

    async clickCopyLinkBtn() {
        await this.page.locator('.referral-program__button', {hasText: 'Copy link'}).click()
    }

    async clickAddManager() {
        await this.page.locator('.ui-button__text--fill', {hasText: 'Add Manager'}).click()
    }

    async clickMyReferralsBtn() {
        await this.page.locator(locators.referralPage.myReferralsBtn).click()
    }

    async clickMyAgentAvatarBtn() {
        await this.page.locator(locators.referralPage.agentAvatarBtn).click()
    }

    async copyAgentCode() {
        return await this.page.locator(locators.referralPage.referralCode).inputValue()
    }

    async enterMyAgentCode(text:string) {
        await this.page.fill(locators.referralPage.myAgentCodeInput, text)
    }

    async checkMyAgentId(agentId:string | number) {
        const myAgentId = await this.page.locator(locators.referralPage.myAgentId).innerText()
        expect(myAgentId).toContain(agentId.toString())
    }

    async checkMyAgentOtherUserProfile(agentId: number) {
        await this.page.waitForSelector(locators.referralPage.otherUserProfileId)
        const myAgentId = await this.page.locator(locators.referralPage.otherUserProfileId).innerText() 
        expect(myAgentId).toContain(agentId.toString())
    }

    async copyCheck() {
        await this.page.isVisible(locators.referralPage.copyBanner) 
    }

    async checkMyReferrals(referralId: number) {
        await this.page.waitForSelector(locators.referralPage.myReferralId)
        const myReferralId = await this.page.locator(locators.referralPage.myReferralId).innerText() 
        expect(myReferralId).toContain(referralId.toString())
    }
}