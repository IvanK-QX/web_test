import { Page } from '@playwright/test'
import { AppLoginPage } from './appPage/login_page'
import { AppSidePanelPage } from './appPage/sidePanel_page'
import { AppPreStreamPage } from './appPage/preStream_page'
import { AppMainPage } from './appPage/main_page'
import { AppStreamPage } from './appPage/stream_page'
import { AppEditProfilePage } from './appPage/editProfile_page'
import { AppChatPage } from './appPage/chat_page'
import { AppBlockedPage } from './appPage/blocked_page'
import { AppProfilePage } from './appPage/profile_page'
import { AppRedeemCashPage } from './appPage/redeemCash_page'

export class App {
    page: Page
    loginPage: AppLoginPage
    sidePanelPage: AppSidePanelPage
    preStreamPage: AppPreStreamPage
    mainPage: AppMainPage
    streamPage: AppStreamPage
    ediProfilePage: AppEditProfilePage
    chatPage: AppChatPage
    blockedPage: AppBlockedPage
    profilePage: AppProfilePage
    redeemCashPage: AppRedeemCashPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new AppLoginPage(this.page)
        this.sidePanelPage = new AppSidePanelPage(this.page)
        this.preStreamPage = new AppPreStreamPage(this.page)
        this.mainPage = new AppMainPage(this.page)
        this.streamPage = new AppStreamPage(this.page)
        this.ediProfilePage = new AppEditProfilePage(this.page)
        this.chatPage = new AppChatPage(this.page)
        this.blockedPage = new AppBlockedPage(this.page)
        this.profilePage = new AppProfilePage(this.page)
        this.redeemCashPage = new AppRedeemCashPage(this.page)
    }
}
