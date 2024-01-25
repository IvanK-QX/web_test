import { test } from '@playwright/test'
import { apiUrl } from '../utils/apiUrl'
import { App } from '../pages/App'
import { locators } from '../pages/appPage/locators'

let user, myAgent, newPage

test.describe('UI Referral Program Flow', async () => {
    test.beforeEach(async ({ page }) => {
        const app = new App(page)
        user = await app.loginPage.apiLogin(apiUrl.qaEnvUrl)
    })

    test('Check Referral Program Page', async ({ page }) => {
        const app = new App(page)
        await app.referralPage.clickProfileBtn()
        await app.referralPage.clickReferralProgramBtn()
        await app.referralPage.clickCopyCodeBtn()
        await app.referralPage.copyCheck()
        await page.waitForSelector(locators.referralPage.copyBanner, { state: 'hidden' });
        await app.referralPage.clickCopyLinkBtn()
        await app.referralPage.copyCheck()
    })

    test('Add My Agent and My Referrals Check', async ({ page, browser}) => {
        const context = await browser.newContext()
        newPage = await context.newPage()
        const app = new App(page)
        const agentApp = new App(newPage)
        myAgent = await agentApp.loginPage.apiLogin(apiUrl.qaEnvUrl)
      
        await agentApp.referralPage.clickProfileBtn()
        await agentApp.referralPage.clickReferralProgramBtn()
        const agentCode = await agentApp.referralPage.copyAgentCode()
       
        //User Flow 
        await app.referralPage.clickProfileBtn()
        await app.referralPage.clickReferralProgramBtn()
        await app.referralPage.enterMyAgentCode(agentCode)
        await app.referralPage.clickAddManager()
        await app.referralPage.checkMyAgentId(myAgent.humanReadableId)
        await app.referralPage.clickMyAgentAvatarBtn()
        await app.referralPage.checkMyAgentOtherUserProfile(myAgent.humanReadableId)

        //My Referrals Check
        await agentApp.referralPage.clickMyReferralsBtn()
        await agentApp.referralPage.checkMyReferrals(user.humanReadableId)
    })
})