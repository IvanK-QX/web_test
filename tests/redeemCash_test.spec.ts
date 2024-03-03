import { apiUrl } from '../utils/apiUrl'
import { mongoDBConnect } from '../dataBase/mongoDB_page'
import { streamerFixture } from '../fixtures/fixtures'
import { apiDataSet } from '../utils/dataSet'

let user, usersDB

streamerFixture.describe.only('UI - Redeem Cash Flow', async () => {
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
        await streamer.app.redeemCashPage.addPaymentMethod({usersDB: usersDB, userId: user.id, userToken: user.userToken, userEmail: user.userEmail, payoneer: payoneerEmail, changedPayoneerEmail: changedPayoneerEmail})
        await streamer.app.redeemCashPage.redeemCash('25')
        await streamer.app.redeemCashPage.clickRedeemHistoryBtn()
    })

    streamerFixture('Add/Change/Redeem - Binance', async ({ streamer }) => {
        const binanceWallet = await streamer.app.redeemCashPage.randomBinanceWalletGenerator()
        const changedBinanceWallet = await streamer.app.redeemCashPage.randomBinanceWalletGenerator()
        await streamer.app.mainPage.clickProfileBtn()
        await streamer.app.redeemCashPage.clickRedeemCashBtn()
        await streamer.app.redeemCashPage.redeemCashTitleCheck()
        await streamer.app.redeemCashPage.addPaymentMethod({usersDB: usersDB, userId: user.id, userToken: user.userToken, userEmail: user.userEmail, binance: binanceWallet, changedBinanceWallet: changedBinanceWallet})
        await streamer.app.redeemCashPage.redeemCash('25')
        await streamer.app.redeemCashPage.clickRedeemHistoryBtn()
    })
})