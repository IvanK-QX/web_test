import { expect, Page, request } from '@playwright/test'
import { apiUrl } from '../../utils/apiUrl'
import { Api } from '../Api'
import { locators } from './locators'

export class AppRedeemCashPage {
    page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async checkDiamondsAmmount(diamindsValue: number, expectedDiamondsValue: number, userId: string) {
        if (diamindsValue <= expectedDiamondsValue) {
            const apiContext = await request.newContext()
            const api = new Api(apiContext)
            const admin = await api.loginPage.loginWithAdminUser(apiUrl.qaEnvUrl)
            await api.profilePage.addDiamonds(`${apiUrl.qaEnvUrl}:3000/profile/balance/diamonds`, admin.adminToken, userId)
        }
    }

    async clickRedeemCashBtn() {
        await this.page.locator(locators.mainPage.redeemCashBtn).click()
    }

    async redeemCashTitleCheck() {
        await this.page.isVisible(locators.redeemCashPage.redeemCashTitle)
    }

    async goLiveBtnCheck() {
        await this.page.isVisible(locators.redeemCashPage.goLiveBtn)
    }

    async clickAddPaymentMethodBtn() {
        await this.page.locator(locators.redeemCashPage.addPaymentMethodBtn).click()
    }

    async clickAddPayoneerBtn() {
        await this.page.locator(locators.redeemCashPage.addPayoneerBtn).click()
    }

    async clickAddPaymentBackBtn() {
        await this.page.locator(locators.redeemCashPage.addPaymentMethodBackBtn).click()
    }

    async clickAddPaymentCloseBtn() {
        await this.page.locator(locators.redeemCashPage.addPaymentMethodCloseBtn).click()
    }

    async enterPayoneerEmail(payoneer: string) {
        await this.page.fill(locators.redeemCashPage.payoneerEmailInput, payoneer)
    }

    async enterBinanceWallet(binanceWallet: string) {
        await this.page.fill(locators.redeemCashPage.binanceWalletInput, binanceWallet)
    }
    
    async clickAddPaymentSaveBtn() {
        await this.page.locator(locators.redeemCashPage.AddPaymentMethodSaveBtn).click()
    }

    async clickAddPaymentOkBtn() {
        await this.page.locator(locators.redeemCashPage.addPaymentOkBtn).click()
    }

    async redeemCashPaymentAddedCheck({
        userToken,
        payoneer = '',
        binance = '',
    }: {
        userToken: string
        payoneer?: string
        binance?: string
    }) {
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
        await this.page.isVisible(locators.redeemCashPage.addedPayoutCard);
    
        if (payoneer) {
            const actualPayoneerEmail = await (await api.profilePage.getProfile(apiUrl.qaEnvUrl, userToken)).payoneerEmail;
            expect(actualPayoneerEmail).toEqual(payoneer);
            console.log(`Payoneer Email -> ${actualPayoneerEmail} is checked`);
        }
    
        if (binance) {
            const actualBinanceWallet = await (await api.profilePage.getProfile(apiUrl.qaEnvUrl, userToken)).binanceWallet;
            expect(actualBinanceWallet).toEqual(binance);
            console.log(`Binance Wallet -> ${actualBinanceWallet} is checked`);
        }
    }

    async clickPayoutsMoreBtn() {
        await this.page.locator(locators.redeemCashPage.redeemCashMoreBtn).click()
    }

    async clickPayoutChangeBtn() {
        await this.page.locator(locators.redeemCashPage.changePayoutBtn).click()
    }

    async clickChangePayoutConfirmationChangeBtn() {
        await this.page.locator(locators.redeemCashPage.changePayoutConfirmationChangeBtn).click()
    }

    async clickRedeemHistoryBtn() {
        await this.page.locator(locators.redeemCashPage.redeemHistoryBtn).click()
    }

    async randomBinanceWalletGenerator() {
        const length = 34;
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        const wallet = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
        return wallet;
    }

    async clickAddBinanceBtn() {
        await this.page.locator(locators.redeemCashPage.addBinanceBtn).click()
    }


}
