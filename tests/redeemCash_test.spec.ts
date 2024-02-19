import { test } from '@playwright/test'
import { apiUrl } from '../utils/apiUrl'
import { App } from '../pages/App'
import { apiDataSet } from '../utils/dataSet'
import { mongoDBConnect } from '../pages/dataBase/mongoDB_page'

let user, usersDB

test.describe('UI - Redeem Cash Flow', async () => {
    test.beforeEach(async ({ page }) => {
        const app = new App(page)
        user = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await app.redeemCashPage.checkDiamondsAmmount(user.diamonds, 9475, user.id)
        usersDB = await mongoDBConnect('core', 'users')
    })

    test('Add/Change/Redeem - Payoneer', async ({ page }) => {
        const app = new App(page)
        const payoneerEmail = apiDataSet.randomEmail
        const changedPayoneerEmail = apiDataSet.randomEmail
        await app.mainPage.clickProfileBtn()
        await app.redeemCashPage.clickRedeemCashBtn()
        await app.redeemCashPage.redeemCashTitleCheck()
        await app.redeemCashPage.clickAddPaymentMethodBtn()
        await app.redeemCashPage.clickAddPayoneerBtn()
        await app.redeemCashPage.enterPayoneerEmail(payoneerEmail)
        await app.redeemCashPage.clickAddPaymentSaveBtn()
        await app.redeemCashPage.clickAddPaymentOkBtn()  
        await app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, payoneer: payoneerEmail}); 
        await app.redeemCashPage.clickPayoutsMoreBtn()
        await app.redeemCashPage.clickPayoutChangeBtn()
        await app.redeemCashPage.clickChangePayoutConfirmationChangeBtn()
        await app.redeemCashPage.enterPayoneerEmail(changedPayoneerEmail)
        await app.redeemCashPage.clickAddPaymentSaveBtn()
        await app.redeemCashPage.clickAddPaymentOkBtn() 
        await app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, payoneer: changedPayoneerEmail})
        await app.redeemCashPage.checkPayoneerEmailInMongoDB(usersDB, user.id, changedPayoneerEmail)
        await app.redeemCashPage.redeemAmountInput('25')
        await app.redeemCashPage.cickRedeemBtn()
        await app.redeemCashPage.cickCashOutRedeemBtn()
        await app.redeemCashPage.cickCashOutOkBtn()
        await app.redeemCashPage.clickRedeemHistoryBtn()
    })

    test('Add/Change/Redeem - Binance', async ({ page }) => {
        const app = new App(page)
        const binanceWallet = await app.redeemCashPage.randomBinanceWalletGenerator()
        const changedBinanceWallet = await app.redeemCashPage.randomBinanceWalletGenerator()
        await app.mainPage.clickProfileBtn()
        await app.redeemCashPage.clickRedeemCashBtn()
        await app.redeemCashPage.redeemCashTitleCheck()
        await app.redeemCashPage.clickAddPaymentMethodBtn()
        await app.redeemCashPage.clickAddBinanceBtn()
        await app.redeemCashPage.enterBinanceWallet(binanceWallet)
        await app.redeemCashPage.clickAddPaymentSaveBtn()
        await app.redeemCashPage.clickAddPaymentOkBtn()  
        await app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, binance: binanceWallet}); 
        await app.redeemCashPage.clickPayoutsMoreBtn()
        await app.redeemCashPage.clickPayoutChangeBtn()
        await app.redeemCashPage.clickChangePayoutConfirmationChangeBtn()
        await app.redeemCashPage.enterBinanceWallet(changedBinanceWallet)
        await app.redeemCashPage.clickAddPaymentSaveBtn()
        await app.redeemCashPage.clickAddPaymentOkBtn() 
        await app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, binance: changedBinanceWallet}); 
        await app.redeemCashPage.checkBinanceWalletInMongoDB(usersDB, user.id, changedBinanceWallet)
        await app.redeemCashPage.redeemAmountInput('25')
        await app.redeemCashPage.cickRedeemBtn()
        await app.redeemCashPage.cickCashOutRedeemBtn()
        await app.redeemCashPage.cickCashOutOkBtn()
        await app.redeemCashPage.clickRedeemHistoryBtn()
    })
})