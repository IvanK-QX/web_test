import { apiUrl } from '../utils/apiUrl'
import { apiDataSet } from '../utils/dataSet'
import { mongoDBConnect } from '../dataBase/mongoDB_page'
import { streamerFixture } from '../fixtures/fixtures'

let user, usersDB

streamerFixture.describe('UI - Redeem Cash Flow', async () => {
    streamerFixture.beforeEach(async ({ streamer }) => {
        user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl)
        await streamer.app.redeemCashPage.checkDiamondsAmmount(user.diamonds, 9475, user.id)
        usersDB = await mongoDBConnect('core', 'users')
    })

    streamerFixture('Add/Change/Redeem - Payoneer', async ({ streamer }) => {
        const payoneerEmail = apiDataSet.randomEmail
        const changedPayoneerEmail = apiDataSet.randomEmail
        await streamer.app.mainPage.clickProfileBtn()
        await streamer.app.redeemCashPage.clickRedeemCashBtn()
        await streamer.app.redeemCashPage.redeemCashTitleCheck()
        await streamer.app.redeemCashPage.clickAddPaymentMethodBtn()
        await streamer.app.redeemCashPage.clickAddPayoneerBtn()
        await streamer.app.redeemCashPage.enterPayoneerEmail(payoneerEmail)
        await streamer.app.redeemCashPage.clickAddPaymentSaveBtn()
        await streamer.app.redeemCashPage.clickAddPaymentOkBtn()  
        await streamer.app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, userEmail: user.email, payoneer: payoneerEmail}); 
        await streamer.app.redeemCashPage.clickPayoutsMoreBtn()
        await streamer.app.redeemCashPage.clickPayoutChangeBtn()
        await streamer.app.redeemCashPage.clickChangePayoutConfirmationChangeBtn()
        await streamer.app.redeemCashPage.enterPayoneerEmail(changedPayoneerEmail)
        await streamer.app.redeemCashPage.clickAddPaymentSaveBtn()
        await streamer.app.redeemCashPage.clickAddPaymentOkBtn() 
        await streamer.app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, userEmail: user.email, payoneer: changedPayoneerEmail})
        await streamer.app.redeemCashPage.checkPayoneerEmailInMongoDB(usersDB, user.id, changedPayoneerEmail)
        await streamer.app.redeemCashPage.redeemAmountInput('25')
        await streamer.app.redeemCashPage.cickRedeemBtn()
        await streamer.app.redeemCashPage.cickCashOutRedeemBtn()
        await streamer.app.redeemCashPage.cickCashOutOkBtn()
        await streamer.app.redeemCashPage.clickRedeemHistoryBtn()
    })

    streamerFixture('Add/Change/Redeem - Binance', async ({ streamer }) => {
        const binanceWallet = await streamer.app.redeemCashPage.randomBinanceWalletGenerator()
        const changedBinanceWallet = await streamer.app.redeemCashPage.randomBinanceWalletGenerator()
        await streamer.app.mainPage.clickProfileBtn()
        await streamer.app.redeemCashPage.clickRedeemCashBtn()
        await streamer.app.redeemCashPage.redeemCashTitleCheck()
        await streamer.app.redeemCashPage.clickAddPaymentMethodBtn()
        await streamer.app.redeemCashPage.clickAddBinanceBtn()
        await streamer.app.redeemCashPage.enterBinanceWallet(binanceWallet)
        await streamer.app.redeemCashPage.clickAddPaymentSaveBtn()
        await streamer.app.redeemCashPage.clickAddPaymentOkBtn()  
        await streamer.app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, userEmail: user.email, binance: binanceWallet}); 
        await streamer.app.redeemCashPage.clickPayoutsMoreBtn()
        await streamer.app.redeemCashPage.clickPayoutChangeBtn()
        await streamer.app.redeemCashPage.clickChangePayoutConfirmationChangeBtn()
        await streamer.app.redeemCashPage.enterBinanceWallet(changedBinanceWallet)
        await streamer.app.redeemCashPage.clickAddPaymentSaveBtn()
        await streamer.app.redeemCashPage.clickAddPaymentOkBtn() 
        await streamer.app.redeemCashPage.redeemCashPaymentAddedCheck({userToken: user.userToken, userEmail: user.email, binance: changedBinanceWallet}); 
        await streamer.app.redeemCashPage.checkBinanceWalletInMongoDB(usersDB, user.id, changedBinanceWallet)
        await streamer.app.redeemCashPage.redeemAmountInput('25')
        await streamer.app.redeemCashPage.cickRedeemBtn()
        await streamer.app.redeemCashPage.cickCashOutRedeemBtn()
        await streamer.app.redeemCashPage.cickCashOutOkBtn()
        await streamer.app.redeemCashPage.clickRedeemHistoryBtn()
    })
})