import { expect, Page, request } from '@playwright/test'
import { Collection } from 'mongodb'
import { apiUrl } from '../../utils/apiUrl'
import { Api } from '../Api'
import { getItemByItemId } from '../../dataBase/mongoDB_page'
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
        userEmail,
        payoneer = '',
        binance = '',
    }: {
        userToken: string
        userEmail: string
        payoneer?: string
        binance?: string
    }) {
        const apiContext = await request.newContext();
        const api = new Api(apiContext);
        await this.page.isVisible(locators.redeemCashPage.addedPayoutCard);
    
        if (payoneer) {
            const actualPayoneerEmail = await (await api.profilePage.getProfile(apiUrl.qaEnvUrl, userToken, userEmail)).payoneerEmail;
            expect(actualPayoneerEmail).toEqual(payoneer);
            console.log(`Payoneer Email -> ${actualPayoneerEmail} is checked`);
        }
    
        if (binance) {
            const actualBinanceWallet = await (await api.profilePage.getProfile(apiUrl.qaEnvUrl, userToken, userEmail)).binanceWallet;
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
        await this.page.locator(locators.redeemCashPage.redeemHistoryTable).isVisible()
    }

    async randomBinanceWalletGenerator() {
        const length = 33;
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        const wallet = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
        const binanceWallet = 'T' + wallet
        return binanceWallet
    }

    async clickAddBinanceBtn() {
        await this.page.locator(locators.redeemCashPage.addBinanceBtn).click()
    }

    async redeemAmountInput(redeemValue: string) {
        await this.page.locator(locators.redeemCashPage.redeemInput).fill(redeemValue)
    }

    async cickRedeemBtn() {
        await this.page.locator(locators.redeemCashPage.redeemCashBtn).click()
    }

    async cickCashOutRedeemBtn() {
        await this.page.locator(locators.redeemCashPage.cashOutRedeemBtn).click()
    }

    async cickCashOutOkBtn() {
        await this.page.waitForTimeout(1000)
        await this.page.locator(locators.redeemCashPage.cashOutDoneOkBtn).click()
    }

    async checkPayoneerEmailInMongoDB(collection: Collection, userId: string, expectedPayoneerEmail: string) {
        const result = await getItemByItemId(collection, userId)
        const returnedPaymentMethod = result[0].payoutEmail
        expect(returnedPaymentMethod).toEqual(expectedPayoneerEmail)
    }

    async checkBinanceWalletInMongoDB(collection: Collection, userId: string, expectedBinanceWallet: string) {
        const result = await getItemByItemId(collection, userId)
        const returnedBinanceMethod = result[0].cryptoWallet
        expect(returnedBinanceMethod).toEqual(expectedBinanceWallet)
    }
}
