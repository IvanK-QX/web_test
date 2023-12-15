import { Locator, Page } from '@playwright/test'
import { apiUrl } from '../../utils/apiUrl'
import { texts } from '../../utils/dataSet'

export class AppProfilePage {
    page: Page
    buyCoinsBtn: Locator
    startStreamBtn: Locator
    folowerCounters: Locator
    coinShopTitle: Locator
    stremTitleInputField: Locator
    kebabMenuBtn: Locator
    kebabMenuBody: Locator
    editProfileTitle: Locator
    editProfileBtn: Locator
    redeemCashBtn: Locator
    redemCashTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.buyCoinsBtn = page.locator('//*[contains(text(),"Buy Coins")]')
        this.startStreamBtn = page.locator('//*[text()=" Start Stream "]')
        this.folowerCounters = page.getByText('0 followers')
        this.coinShopTitle = page.locator('span.coins-shop-modal__title-text')
        this.stremTitleInputField = page.locator('[placeholder="Stream title"]')
        this.kebabMenuBtn = page.locator('div.context-menu')
        this.kebabMenuBody = page.locator('div.context-menu__body')
        this.editProfileTitle = page.locator('h1.header-title--desktop', {hasText: texts.editProfileTitle})
        this.editProfileBtn = page.locator('//*[contains(text(),"Edit Profile")]')
        this.redeemCashBtn = page.locator('//*[contains(text(),"Redeem Cash")]')
        this.redemCashTitle = page.locator('span.redeem-card__title-text')
    }

    async open() {
        await this.page.goto(`${apiUrl.qaUiUrl}/profile`)
        await this.page.waitForLoadState('networkidle')
    }

    async observeStartStreamButton() {
        await this.startStreamBtn.waitFor()
    }

    async observeBuyCoinsButton() {
        await this.buyCoinsBtn.waitFor()
    }

    async observePersonalInfo(userName: string) {
        await this.folowerCounters.waitFor()
        await this.page.getByRole('img', { name: `Avatar ${userName} picture` }).click()
        await this.page.locator('p.profile-info__name', { hasText: `${userName}` }).waitFor()
    }

    async clickBuyCoinsBtn() {
        await this.buyCoinsBtn.click()
        await this.coinShopTitle.waitFor()
    }

    async clickStartStreamBtn() {
        await this.startStreamBtn.click()
        await this.stremTitleInputField.waitFor()
    }

    async clickKebabMenuBtn() {
        await this.kebabMenuBtn.click()
        await this.kebabMenuBody.waitFor()
    }

    async clickEditProfileBtn() {
        await this.editProfileBtn.click()
        await this.editProfileTitle.waitFor()
    }

    async clickRedeemCashBtn() {
        await this.redeemCashBtn.click()
        await this.redemCashTitle.waitFor()
    }

    async observeMyBio(bio: string) {
        await this.page.locator('p.profile-info__description-text', { hasText: `${bio}` }).waitFor()
    }
}
