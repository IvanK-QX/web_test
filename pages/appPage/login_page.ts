import { APIRequestContext, request, Page } from '@playwright/test'
import { Api } from '../Api'
import { apiUrl } from '../../utils/apiUrl'
import { apiDataSet } from '../../utils/dataSet'
export class AppLoginPage {
    apiContext: APIRequestContext
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async apiLogin(url: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const api = new Api(apiContext)
        await this.page.goto(`${apiUrl.qaUiUrl}`)
        await this.page.waitForLoadState('domcontentloaded')
        const login = await api.loginPage.login(`${url}:3000/login`)
        const user = await api.loginPage.addEmail(`${url}:3000/login`, login.token, apiDataSet.deviceUUID)
        await this.page.reload()
        await this.page.evaluate(`window.localStorage.setItem('token', "${user.userToken}")`)
        await this.page.evaluate(`window.localStorage.setItem('isAuthorized', "true")`)
        await this.page.evaluate(`window.localStorage.setItem('streamData', 'null')`)
        const date = new Date().toISOString()
        await this.page.evaluate(`window.localStorage.setItem('lastGiftListRequestDate', '${date}')`)
        await this.page.evaluate(`window.localStorage.setItem('profile', '${JSON.stringify(user.profile)}')`);
        await this.page.reload()
        const userToken = user.userToken
        const id = user.id
        const name = user.name
        const humanReadableId = user.humanReadableId
        const diamonds = user.diamonds
        await api.slackPage.addCoins(humanReadableId)
        //await api.slackPage.disableCloacing(humanReadableId)
        return { userToken, id, name, humanReadableId, diamonds }
    }
}
